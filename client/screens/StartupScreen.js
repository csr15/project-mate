import React, { useEffect } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";

import Loader from "../components/Loader";
import * as actions from "../store/action/profile-action";
import { fetchNotifications } from "../store/action/notification-action";

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userDetails = await AsyncStorage.getItem("userDetails");
      const transformedData = JSON.parse(userDetails);

      if (!userDetails) {
        props.navigation.navigate("AuthScreen");
        return;
      }

      dispatch(actions.fetchUserDetailsHandler(transformedData.uid));
      dispatch(fetchNotifications(transformedData.uid));
      props.navigation.navigate("Navigator");
    };

    tryLogin();
  }, []);
  return <Loader size="large" />;
};

export default StartupScreen;

const styles = StyleSheet.create({});
