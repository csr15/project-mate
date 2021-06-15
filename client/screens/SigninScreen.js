import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";

import Input from "../components/Input";
import Colors from "../constants/Colors";
import * as actions from "../store/action/auth-action";
import Popup from "../components/Popup";

const SigninScreen = (props) => {
  const [signinData, setSigninData] = useState({
    mail: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMailNotValid, setIsMailNotValid] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const signupData = useSelector((state) => {
    return state.auth.signupData;
  });

  const dispatch = useDispatch();
  const signinHandler = () => {
    if (
      signinData.mail !== "" &&
      signinData.password !== "" &&
      isMailNotValid === false &&
      isPasswordNotValid == false
    ) {
      setIsLoading(true);
      dispatch(actions.signinHandler(signinData))
        .then(() => {
          setIsLoading(false);
          props.navigation.navigate("Navigator");
        })
        .catch((err) => {
          setIsLoading(false);
          setIsAlertError("Username or password is wrong, Pleae try again");
        });
    } else {
      setIsAlertError("Please fill all the fields to continue");
    }
  };

  const mailHandler = () => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (signinData.mail) {
      if (emailRegex.test(signinData.mail)) {
        setIsMailNotValid(false);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello!</Text>
        <Text style={styles.subTitle}>Signin to your account here.</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Email Id"
          error={isMailNotValid && "Enter a valid email ID"}
          input={{
            placeholder: "user@mail.com",
            autoCapitalize: "none",
            autoCompleteType: "off",
            keyboardType: "email-address",
            onChangeText: (text) =>
              setSigninData({ ...signinData, mail: text }),
            onBlur: mailHandler,
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
              setSigninData({ ...signinData, password: text }),
            onBlur: passwordHandler,
          }}
        />
        <Button
          title="Signin in to your account"
          isLoading={isLoading}
          clickHandler={signinHandler}
        />
        <TouchableOpacity style={styles.navContainer}>
          <Text
            style={styles.navText}
            onPress={() => props.navigation.navigate("Signup")}
          >
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
      {isAlertError ? (
        <Popup
          message={isAlertError}
          onClick={() => setIsAlertError("")}
        />
      ) : null}
    </ScrollView>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 10,
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingVertical: 40,
  },
  header: {
    marginBottom: 40,
    position: "relative",
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

SigninScreen.navigationOptions = {
  headerTitle: "",
};
