import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import Avatar from "./Avatar";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CollaboratedProjectCard = ({ item, index, isReqTab, confirmDeleteHandler }) => {
  return (
    <View
      style={[styles.reqContainer, index === 0 ? { paddingTop: 0 } : null]}
      onPress={() => {
        props.navigation.navigate("ViewProject", {
          projectId: item.projectId,
        });
      }}
    >
      <View style={styles.reqHeader}>
        <Avatar title={item.publisherName} />
        <Text style={styles.reqTitle} numberOfLines={1}>
          {item.publisherName}
        </Text>
      </View>
      <Text style={styles.reqBody}>{item.projectTitle}</Text>
      <View style={styles.reqFooter}>
        <View
          style={{
            ...styles.reqFooter,
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.reqFooterText}>
            {moment(item.createdAt).fromNow()}
          </Text>
          <View style={styles.spacer}></View>
          {isReqTab && (
            <Text
              style={
                item.status === "pending"
                  ? styles.reqFooterTextPending
                  : styles.reqFooterTextDenied
              }
            >
              {item.status}
            </Text>
          )}
        </View>
        {isReqTab && (
          <>
            <TouchableOpacity onPress={confirmDeleteHandler}>
              <Ionicons name="trash-bin-sharp" size={22} color="#DC3545" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CollaboratedProjectCard;

const styles = StyleSheet.create({
  spacer: {
    width: 3,
    height: 3,
    backgroundColor: "#9FACC8",
    marginHorizontal: 12,
    opacity: 0.7,
    borderRadius: 100,
  },
  reqContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF0F6",
  },
  reqHeader: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  reqTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    marginLeft: 10,
  },
  reqBody: {
    fontFamily: "Poppins_500Medium",
    color: "black",
    fontSize: 16,
    marginBottom: 5,
  },
  reqFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 0,
  },
  reqFooterText: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
  reqFooterTextPending: {
    fontFamily: "Poppins_400Regular",
    color: "#FFc107",
    textTransform: "uppercase",
  },
  reqFooterTextDenied: {
    fontFamily: "Poppins_400Regular",
    color: "#DC3545",
    textTransform: "uppercase",
  },
});
