import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import NotificationCard from "../components/NotificationCard";
import Popup from "../components/Popup";
import ViewRequestedUser from "../components/ViewRequestedUser";

import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";
import * as actions from "../store/action/notification-action";

const NotificationScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserID] = useState("");
  const [showUser, setShowUser] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return {
      notifications: state.notification.notifications,
      userDetails: state.profile.userDetails,
    };
  });

  useEffect(() => {
    fetchNotificationsHandler();
  }, []);

  const dispatch = useDispatch();

  const fetchNotificationsHandler = () => {
    setIsLoading(true);
    AsyncStorage.getItem("userDetails")
      .then((userDetails) => {
        const transformedData = JSON.parse(userDetails);

        dispatch(actions.fetchNotifications(transformedData.uid))
          .then((_) => setIsLoading(false))
          .catch((err) => setIsLoading(false));
      })
      .catch((err) => {
        setIsAlertError(
          "Problem occured while fetcing notifications, Please try again"
        );
      });
  };

  const acceptRequestHandler = async (data) => {
    try {
      await axios.patch(
        `${Proxy.proxy}/request/accept_request/${data._id}/${data.requestedUserId}/${data.requesterUserName}/${data.projectId}`
      );

      fetchNotificationsHandler();
    } catch (error) {
      setIsAlertError(
        "Problem occured while accepting a proposal, Please try again"
      );
    }
  };

  const denyRequestHandler = async (id) => {
    try {
      await axios.patch(`${Proxy.proxy}/request/deny_request/${id}`);

      fetchNotificationsHandler();
    } catch (error) {
      setIsAlertError("Problem occured when deny a project, Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      {state.notifications && state.notifications.length > 0 ? (
        <FlatList
          keyExtractor={(key, index) => key + index}
          onRefresh={fetchNotificationsHandler}
          refreshing={isLoading}
          data={state.notifications}
          renderItem={({ item }) => {
            return (
              <NotificationCard
                details={item}
                acceptRequest={acceptRequestHandler.bind(this, item)}
                denyRequest={denyRequestHandler.bind(this, item._id)}
                viewUserDetails={() => {
                  setUserID(item.requestedUserId);
                  showUser(true);
                }}
              />
            );
          }}
        />
      ) : (
        <Message
          onRefresh={fetchNotificationsHandler}
          refreshing={isLoading}
          data="No notification yet"
        />
      )}
      {showUser && (
        <ViewRequestedUser
          userId={userId}
          show={showUser}
          hideHandler={() => {
            setUserID("");
            setShowUser(false);
          }}
        />
      )}
      {isAlertError ? (
        <Popup
          message={isAlertError}
          onClick={() => setIsAlertError("")}
        />
      ) : null}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 15,
    marginBottom: 10,
    paddingTop: 20,
  },
  message: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    marginHorizontal: 20,
    textAlign: "center",
  },
});

NotificationScreen.navigationOptions = {
  headerShown: false,
};
