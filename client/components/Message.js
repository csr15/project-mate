import React from "react";
import { StyleSheet, Text, FlatList, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Message = (props) => {
  return (
    <View style={styles.messageContainer}>
      <FlatList
        data={[props.data]}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        keyExtractor={(key, index) => key + index}
        renderItem={({ item }) => {
          return (
            <>
              <Text style={styles.message}>{item}</Text>
              {props.isError && (
                <TouchableOpacity
                  style={[styles.button, { flex: 0, marginTop: 15 }]}
                  onPress={props.fetchProjectsHandler}
                >
                  <Text style={styles.buttonText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  message: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: Colors.accent,
    marginTop: Dimensions.get("window").height / 3,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});
