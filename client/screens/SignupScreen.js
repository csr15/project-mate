import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";

import Input from "../components/Input";
import Popup from "../components/Popup";
import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";
import * as actions from "../store/action/auth-action";

const SignupScreen = (props) => {
  const [signupData, setSignupData] = useState({
    userName: "",
    sureName: "",
    mail: "",
    password: "",
  });
  const [isUserNameNotAvailable, setIsUserNameNotAvailable] = useState(false);
  const [isSureNameNotValid, setIsSureNameNotValid] = useState(false);
  const [isMailNotAvailable, setIsMailNotAvailable] = useState(false);
  const [isMailNotValid, setIsMailNotValid] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => state.auth.value);

  console.log(state);

  const checkUserNameHandler = async () => {
    if (signupData.userName !== "") {
      try {
        const { data } = await axios.post(
          `${Proxy.proxy}/auth/username_validation`,
          {
            userName: signupData.userName,
          }
        );

        if (data !== null) {
          setIsUserNameNotAvailable(true);
        } else {
          setIsUserNameNotAvailable(false);
        }
      } catch (error) {
        setIsAlertError(
          "Problem occured while checking user name, Please try again"
        );
      }
    }
  };

  const sureNameHandler = () => {
    if (signupData.sureName) {
      if (!/^[a-zA-Z ]+$/.test(signupData.sureName)) {
        setIsSureNameNotValid(true);
      } else {
        setIsSureNameNotValid(false);
      }
    }
  };

  const checkMailHandler = async () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (signupData.mail !== "") {
      if (emailRegex.test(signupData.mail)) {
        setIsMailNotValid(false);
        try {
          const { data } = await axios.post(
            `${Proxy.proxy}/auth/mail_validation`,
            {
              mail: signupData.mail,
            }
          );

          if (data !== null) {
            setIsMailNotAvailable(true);
          } else {
            setIsMailNotAvailable(false);
          }
        } catch (error) {
          setIsAlertError(
            "Problem occured while checking mail ID, Please try again"
          );
        }
      } else {
        setIsMailNotValid(true);
      }
    }
  };

  const passwordHandler = () => {
    if (signupData.password) {
      if (signupData.password.length < 8) {
        setIsPasswordNotValid(true);
      } else setIsPasswordNotValid(false);
    }
  };

  const dispatch = useDispatch();
  const signupHandler = () => {
    if (
      signupData.userName !== "" &&
      signupData.sureName !== "" &&
      signupData.mail !== "" &&
      signupData.password !== "" &&
      isUserNameNotAvailable === false &&
      isSureNameNotValid === false &&
      isMailNotAvailable === false &&
      isMailNotValid === false &&
      isPasswordNotValid === false
    ) {
      setIsLoading(true);
      dispatch(actions.signupHandler(signupData))
        .then(() => {
          setIsLoading(false);
          props.navigation.navigate("Signin");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsAlertError(
            "Problem occured while creating an account, Please try again"
          );
        });
    } else {
      setIsAlertError("Please fill all the fields to continue");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Join Project-Devs!</Text>
        <Text style={styles.subTitle}>
          Signin up to connect with your mates
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="User Name"
          error={isUserNameNotAvailable && "This username is not available"}
          input={{
            placeholder: "john_doe15",
            autoCapitalize: "none",
            autoCompleteType: "off",
            onChangeText: (text) =>
              setSignupData({ ...signupData, userName: text }),
            onBlur: checkUserNameHandler,
          }}
        />
        <Input
          label="Sure Name"
          error={isSureNameNotValid && "Surename must be letters"}
          input={{
            placeholder: "Jhon Doe",
            autoCapitalize: "none",
            autoCompleteType: "off",
            onChangeText: (text) =>
              setSignupData({ ...signupData, sureName: text }),
            onBlur: sureNameHandler,
          }}
        />
        <Input
          label="Email Id"
          mailError={isMailNotValid && "Enter a valid mail ID"}
          error={isMailNotAvailable && "This mail ID is not available"}
          input={{
            placeholder: "user@mail.com",
            autoCapitalize: "none",
            autoCompleteType: "off",
            keyboardType: "email-address",
            onChangeText: (text) =>
              setSignupData({ ...signupData, mail: text }),
            onBlur: checkMailHandler,
          }}
        />
        <Input
          label="Password"
          error={isPasswordNotValid && "Password length must be minimum 8"}
          input={{
            placeholder: "xxxxx",
            autoCapitalize: "none",
            autoCompleteType: "off",
            secureTextEntry: true,
            onChangeText: (text) =>
              setSignupData({ ...signupData, password: text }),
            onBlur: passwordHandler,
          }}
        />
        <Button
          title="Create an account"
          isLoading={isLoading}
          clickHandler={signupHandler}
        />
        <TouchableOpacity style={styles.navContainer}>
          <Text
            style={styles.navText}
            onPress={() => props.navigation.navigate("Signin")}
          >
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>

      {isAlertError ? (
        <Popup message={isAlertError} onClick={() => setIsAlertError("")} />
      ) : null}
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 40,
    paddingTop: 10,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    textAlign: "center",
    color: "#000000",
  },
  subTitle: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: Colors.accent,
    marginTop: 5,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: Colors.primary,
    marginTop: 15,
    borderRadius: 7,
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    color: "#ffffff",
  },
  navContainer: {
    marginTop: 10,
  },
  navText: {
    color: Colors.accent,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
  },
});

SignupScreen.navigationOptions = {
  headerTitle: "",
};
