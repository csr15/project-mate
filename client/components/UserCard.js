import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";

const UserCard = (props) => {
  return (
    <View style={styles.devpropsopersContainer}>
      <View style={styles.avatar}>
        <Avatar title={props.name} />
      </View>
      <View style={styles.devpropsoper}>
        <Text style={styles.devpropsoperName} numberOfLines={1}>
          {props.name}
        </Text>
        <Text style={styles.devpropsoperRole} numberOfLines={1}>
          {props.role}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  devpropsopersContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 10,
  },
  avatar: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  devpropsoper: {
    width: "90%",
    paddingLeft: 15,
  },
  devpropsoperName: {
    fontFamily: "Poppins_500Medium",
    color: "#000000",
    textTransform: "capitalize",
  },
  devpropsoperRole: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    textTransform: "capitalize",
    marginTop: -2,
  },
});
