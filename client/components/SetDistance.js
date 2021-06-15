import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";

const SetDistance = (props) => {
  return (
    <Modal visible={props.showHeader} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Set Maximum Distance</Text>
          <Text style={styles.modalSubTitle}>
            To search for projects around this distance
          </Text>
          <ScrollView horizontal style={styles.modalButtonContainer}>
            <TouchableOpacity
              onPress={() => props.setDistance(5)}
              style={[
                styles.modalButton,
                props.distance === 5 && styles.modalActiveButton,
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  props.distance === 5 && styles.modalActiveButtonText,
                ]}
              >
                5km
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.setDistance(100)}
              style={[
                styles.modalButton,
                props.distance === 100 && styles.modalActiveButton,
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  props.distance === 100 && styles.modalActiveButtonText,
                ]}
              >
                100km
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.setDistance(500)}
              style={[
                styles.modalButton,
                props.distance === 500 && styles.modalActiveButton,
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  props.distance === 500 && styles.modalActiveButtonText,
                ]}
              >
                500km
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.setDistance(1000)}
              style={[
                styles.modalButton,
                props.distance === 1000 && styles.modalActiveButton,
              ]}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  props.distance === 1000 && styles.modalActiveButtonText,
                ]}
              >
                1000km
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={{ ...styles.button, ...styles.buttonOutline }}
              onPress={props.hideModal}
            >
              <Text
                style={
                  (styles.buttonText,
                  { color: Colors.primary, fontFamily: "Poppins_500Medium" })
                }
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.hideModal();
                props.fetchProjectsHandler();
              }}
            >
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SetDistance;

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modal: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#000000",
    marginBottom: 5,
    textAlign: "center",
  },
  modalSubTitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: Colors.accent,
    textAlign: "center",
  },
  modalButtonContainer: {
    marginVertical: 30,
  },
  modalButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#ffffff",
  },
  modalButtonText: { fontFamily: "Poppins_500Medium", color: Colors.accent },
  modalActiveButton: {
    borderColor: Colors.primary,
    backgroundColor: "#d9e6ff",
  },
  modalActiveButtonText: {
    color: Colors.primary,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
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
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  noProjectsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageTitle: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
});
