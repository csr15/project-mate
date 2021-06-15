import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const Input = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.header}>
        <Text style={styles.label}>{props.label}</Text>
        {props.error && (
          <>
            <View style={styles.spacer}></View>
            <Text style={styles.error}>{props.error}</Text>
          </>
        )}
        {props.mailError && (
          <>
            <View style={styles.spacer}></View>
            <Text style={styles.error}>{props.mailError}</Text>
          </>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          {...props.input}
          style={[
            styles.input,
            props.icon ? { width: "90%" } : { width: "100%" },
          ]}
        />
        {props.icon && (
          <TouchableOpacity style={styles.iconContainer}>
            <Icon
              name={props.icon}
              style={styles.icon}
              onPress={props.onClickHandler}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3
  },
  label: {
    fontFamily: "Poppins_500Medium",
    color: Colors.accent,
    textTransform: "capitalize",
    fontSize: 12
  },
  spacer: {
    width: 3,
    height: 3,
    borderRadius: 1000,
    opacity: 0.8,
    backgroundColor: Colors.accent,
    marginHorizontal: 10,
  },
  error: {
    color: Colors.error,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#d8e1e3",
    borderRadius: 3,
  },
  input: {
    paddingVertical: 13,
    paddingHorizontal: 10,
    width: "90%",
    fontFamily: "Poppins_400Regular"
  },
  iconContainer: {
    width: "100%",
  },
  icon: {
    fontSize: 22,
    color: Colors.accent,
  },
});
