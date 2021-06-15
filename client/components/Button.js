import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const Button = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        props.style,
        props.secondary ? styles.secondary : styles.primary,
      ]}
      disabled={props.isLoading}
      onPress={props.clickHandler}
    >
      {props.isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <>
          <Text
            style={[
              styles.buttonText,
              props.secondary ? { color: "#3d4142" } : { color: "#ffffff" },
            ]}
          >
            {props.title}
          </Text>
          {props.iconName && (
            <Ionicons
              name={props.iconName}
              size={16}
              color={props.secondary ? "#3d4142" : "#ffffff"}
              style={{marginLeft: 5}}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 15,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row"
  },
  secondary: {
    backgroundColor: Colors.inputBorder,
    borderWidth: 1,
    borderColor: "#cccccc",
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
