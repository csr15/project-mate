import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import Loader from "./Loader";
import Proxy from "../constants/Proxy";
import Avatar from "./Avatar";
import Colors from "../constants/Colors";
import Popup from "./Popup";

const ViewRequestedUser = (props) => {
  const [userDetails, setUserDetails] = useState("");
  const [isAlertError, setIsAlertError] = useState("");

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/profile/requested_user_details/${props.userId}`
      );

      setUserDetails(data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
      setIsAlertError(
        "Problem occured while fetcing user details, Please try again"
      );
    }
  };
  return (
    <Modal visible={props.show} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          {userDetails ? (
            <>
              <View style={styles.modalAvatar}>
                <Avatar
                  title={userDetails.userName}
                  width={70}
                  height={70}
                  fontSize={22}
                />
                <Text style={styles.modalUserName} numberOfLines={1}>
                  {userDetails.userDetails.userName}
                </Text>
                <Text style={styles.modalSureName} numberOfLines={1}>
                  {userDetails.userDetails.sureName}
                </Text>
              </View>
              <View style={styles.modalButtonContainer}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalcount}>
                    {userDetails.projectsPublished}
                  </Text>
                  <Text style={styles.modalbuttonTitle}>Projects</Text>
                </View>
                <View style={styles.modalButton}>
                  <Text style={styles.modalcount}>
                    {userDetails.collaboratedProjects}
                  </Text>
                  <Text style={styles.modalbuttonTitle}>Collaborations</Text>
                </View>
              </View>
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <Loader size="small" color={Colors.accent} />
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.close}
            onPress={props.hideHandler}
          >
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isAlertError ? (
        <Popup
          message={isAlertError}
          onClick={() => setIsAlertError("")}
        />
      ) : null}
    </Modal>
  );
};

export default ViewRequestedUser;

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 9999,
  },
  modalAvatar: {
    alignItems: "center",
    marginTop: -50,
  },
  modalSureName: {
    color: Colors.accent,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  modalUserName: {
    color: "#000000",
    fontFamily: "Poppins_500Medium",
    marginVertical: 5,
    marginTop: 20,
    fontSize: 22,
  },
  modalButtonContainer: {
    marginVertical: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    justifyContent: "space-between",
    marginHorizontal: 7,
    borderRadius: 5,
    width: Dimensions.get("window").width / 2.5,
  },
  modalcount: {
    fontSize: 24,
    color: Colors.accent,
    fontFamily: "Poppins_700Bold",
  },
  modalbuttonTitle: {
    fontSize: 14,
    color: Colors.accent,
    fontFamily: "Poppins_400Regular",
  },
  close: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    width: Dimensions.get("window").width / 1.2,
    borderRadius: 12,
  },
  closeButton: {
    fontFamily: "Poppins_500Medium",
    color: "#000000",
  },
});
