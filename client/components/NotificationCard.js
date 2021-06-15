import moment from "moment";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";

const NotificationCard = (props) => {
  return (
    <View
      style={styles.reqContainer}
      onPress={() => {
        props.navigation.navigate("ViewProject", {
          projectId: props.details.projectId,
        });
      }}
    >
      <View>
        <TouchableWithoutFeedback
          style={styles.header}
          onPress={props.viewUserDetails}
        >
          <Avatar title={props.details.requesterUserName} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.userName}>
              {props.details.requesterUserName}
            </Text>
            <Text style={styles.date}>
              {moment(props.details.createdAt).fromNow()}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.reqBody}>
          Requested to collaborate on your project{" "}
          <Text style={styles.reqProjectTitle}>
            {props.details.projectTitle}
          </Text>
        </Text>
      </View>
      <View style={styles.reqFooter}>
        <TouchableOpacity
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onPress={props.denyRequest}
        >
          <Text style={(styles.buttonText, styles.buttonSecondaryText)}>
            Deny
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.acceptRequest}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  reqContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F6",
  },
  reqBody: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    fontSize: 14,
    marginVertical: 5,
  },
  reqUser: {
    fontFamily: "Poppins_500Medium",
    color: "black",
    fontSize: 16,
    width: Dimensions.get("window").width / 1.8,
  },
  reqProjectTitle: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.accent,
  },
  reqFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
    width: Dimensions.get("window").width / 2.3,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
  buttonSecondary: {
    backgroundColor: Colors.inputBorder,
  },
  buttonSecondaryText: {
    color: Colors.accent,
    fontFamily: "Poppins_500Medium",
  },
  header: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#000000",
  },
  date: {
    color: Colors.accent,
    fontSize: 12,
    fontFamily: "Poppins_300Light",
  },
});
