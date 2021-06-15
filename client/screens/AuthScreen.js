import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";

// import firebase from "../firebase/base";
import Colors from "../constants/Colors";
import Popup from "../components/Popup";
import { googleAuthHandler } from "../store/action/auth-action";
import { useDispatch } from "react-redux";

const AuthScreen = (props) => {
  const [isAlertError, setIsAlertError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const signin = async () => {
    setIsLoading(true);
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "648215447188-0e7fqg2irr4g6h4rhp20tq9lj228rplp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setIsLoading(false);
        dispatch(googleAuthHandler(result.user))
          .then(() => {
            setIsLoading(false);
            props.navigation.navigate("Navigator");
          })
          .catch(() => {
            setIsLoading(false);
            setIsAlertError(
              "Something went wrong on signin with google, Please try againg"
            );
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setIsAlertError(
        "Something went wrong on signin with google, Please try againg"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/auth-screen.png")}
          style={styles.image}
        />
        <Text style={styles.title}>Project Mate</Text>
        <Text style={styles.subTitle}>
          Find and collaborate with developers accross the world
        </Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Signin")}
          >
            <Text style={styles.buttonText}>Signin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.buttonOutline }}
            onPress={signin}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Text style={{ ...styles.buttonText, color: Colors.primary }}>
                Signin With Google
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity
            style={{
              ...styles.button,
              borderWidth: 0,
              backgroundColor: "transparent",
            }}
            onPress={() => props.navigation.navigate("Signup")}
          >
            <Text style={{ ...styles.buttonText, color: Colors.accent }}>
              Create an account
            </Text>
          </TouchableOpacity>
        </View>
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

export default AuthScreen;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: "center",
    flexGrow: 1,
  },
  container: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 0,
    resizeMode: "contain",
  },
  title: {
    color: "black",
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    textAlign: "center",
    marginTop: -Dimensions.get("window").height / 10,
  },
  subTitle: {
    color: Colors.lightAccent,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: Dimensions.get("window").height / 12,
  },
  buttonGroup: {
    marginTop: Dimensions.get("window").height / 10,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: Colors.primary,
    width: Dimensions.get("window").width / 1.8,
  },
  spacer: {
    width: Dimensions.get("window").width / 1.1,
    height: 1,
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.inputBorder,
  },
  googleButton: {
    flex: 0,
    backgroundColor: "#4285F4",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
});

AuthScreen.navigationOptions = {
  headerShown: false,
};
