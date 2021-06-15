import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import moment from "moment";

import Avatar from "./Avatar";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const ProjectCard = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.index === 0 ? { paddingTop: 0, marginTop: 5 } : null,
      ]}
      onPress={() =>
        props.navigation.navigate("ViewProject", {
          projectId: props.project._id,
        })
      }
    >
      <View style={styles.header}>
        <Avatar title={props.project.userName} />
        <Text style={styles.userName}>{props.project.userName}</Text>
      </View>
      <Text style={styles.title}>{props.project.title}</Text>
      <ScrollView contentContainerStyle={styles.footer} horizontal>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="users" style={styles.icon} />
          <Text style={styles.iconText}>{props.project.developers.length}</Text>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="file-code" style={styles.icon} />
          <Text style={styles.iconText}>{props.project.developers.length}</Text>
        </View>
        {/* {props.isNearbyProject && (
          <>
            <View style={styles.spacer}></View>
            <View style={styles.iconContainer}>
              <Ionicons name="location-sharp" style={styles.icon} />
              <Text style={styles.iconText}>{props.distance}km</Text>
            </View>
          </>
        )} */}
        <View style={styles.spacer}></View>
        <View style={styles.iconContainer}>
          <MaterialIcons name="date-range" style={styles.icon} />
          <Text style={styles.iconText}>
            {moment(props.project.createdAt).from()}
          </Text>
        </View>
      </ScrollView>
      {props.isMyProjectsTab && (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.buttonSecondary }}
            onPress={props.onHide}
            onPress={props.project.hide ? props.onShow : props.onHide}
          >
            <Text style={(styles.buttonText, styles.buttonSecondaryText)}>
              {props.project.hide ? "Show" : "Hide"} Project
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={props.onCompleted}>
            <Text style={styles.buttonText}>Completed</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F6",
  },
  header: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 10,
  },
  title: {
    fontFamily: "Poppins_500Medium",
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    color: "#9FACC8",
    marginBottom: 10,
    fontSize: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 0,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontFamily: "Poppins_500Medium",
    color: "#9FACC8",
    marginLeft: 3,
    paddingTop: 3,
    fontSize: 15,
  },
  icon: {
    fontSize: 15,
    marginRight: 3,
    color: "#9FACC8",
  },
  spacer: {
    width: 3,
    height: 3,
    backgroundColor: "#9FACC8",
    marginHorizontal: 12,
    opacity: 0.7,
    borderRadius: 100,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: Dimensions.get("window").width / 15,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
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
});
