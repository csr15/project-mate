import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  AsyncStorage,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Avatar from "../components/Avatar";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import * as actions from "../store/action/profile-action";
import Popup from "../components/Popup";

const ProfileScreen = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const [totalCollaboratedProjects, setTotalCollaboratedProjects] = useState(0);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return {
      userDetails: state.profile.userDetails,
      userProjects: state.profile.userProjects,
      collaboratedProjects: state.profile.collaboratedProjects,
    };
  });

  useEffect(() => {
    if (state.userDetails === "") {
      userDetailsHandler();
    }
    if (state.collaboratedProjects === "") {
      onFetchCollaborateList();
    }
  }, []);

  useEffect(() => {
    if (state.collaboratedProjects) {
      const collaboratedProjects = state.collaboratedProjects.filter(
        (el) => el.status === "granted"
      );

      setTotalCollaboratedProjects(collaboratedProjects.length);
    }
  }, [state.collaboratedProjects]);

  const dispatch = useDispatch();
  const userDetailsHandler = () => {
    setRefreshing(true);
    AsyncStorage.getItem("userDetails")
      .then((userDetails) => {
        const transformedData = JSON.parse(userDetails);
        setRefreshing(false);
        dispatch(actions.fetchUserDetailsHandler(transformedData.uid));
      })
      .catch((err) => {
        setRefreshing(false);
        setIsAlertError(
          "Problem occured while fetcing user details, Please try again"
        );
      });
  };

  const logoutHandler = () => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => {
        dispatch({ type: "LOGOUT" });
        props.navigation.navigate("Startup");
      });
  };

  const onFetchCollaborateList = () => {
    AsyncStorage.getItem("userDetails")
      .then((userDetails) => {
        const transformedData = JSON.parse(userDetails);
        dispatch(
          actions.fetchUserCollaboratedProjectsHandler(transformedData.uid)
        );
      })
      .catch((err) => {
        setIsAlertError(
          "Problem occured while fetcing collaborated projects, Please try again"
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={userDetailsHandler}
            title="Loading..."
          />
        }
      >
        <ImageBackground
          source={require("../assets/images/profile-bg.png")}
          style={styles.backgroundImage}
        >
          <View style={styles.profileContainer}>
            {state.userDetails ? (
              <View style={{ justifyContent: "space-between", flex: 1 }}>
                <>
                  <View style={styles.avatar}>
                    <Avatar
                      title={state.userDetails.sureName}
                      width={70}
                      height={70}
                      fontSize={22}
                    />
                    <Text style={styles.userName} numberOfLines={1}>
                      {state.userDetails.userName}
                    </Text>
                    <Text style={styles.sureName} numberOfLines={1}>
                      {state.userDetails.sureName}
                    </Text>
                  </View>
                  <ScrollView>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                          props.navigation.navigate("UserProjects")
                        }
                      >
                        <Text style={styles.count}>
                          {state.userProjects.length}
                        </Text>
                        <Text style={styles.buttonTitle}>Projects</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                          props.navigation.navigate("Collaboration")
                        }
                      >
                        <Text style={styles.count}>
                          {totalCollaboratedProjects}
                        </Text>
                        <Text style={styles.buttonTitle}>Collaborations</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.options}>
                      <Text style={styles.optionsTitle}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.options}>
                      <Text style={styles.optionsTitle}>Developers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.options}>
                      <Text style={styles.optionsTitle}>Version 1.0.0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.options}
                      onPress={logoutHandler}
                    >
                      <Text
                        style={[styles.optionsTitle, { color: Colors.error }]}
                      >
                        Logout
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </>
                <View>
                  <View style={styles.logo}>
                    <Text style={styles.logoText}>DEV</Text>
                    <View style={styles.logoIconContainer}>
                      <Ionicons
                        name="arrow-forward-outline"
                        style={styles.logoIcon}
                      />
                      <Ionicons
                        name="arrow-back-outline"
                        style={styles.logoIcon}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <Loader size="large" color={Colors.primary} />
            )}
          </View>
        </ImageBackground>
        {isAlertError ? (
          <Popup
            message={isAlertError}
            error
            onClick={() => setIsAlertError("")}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  profileContainer: {
    backgroundColor: "#ffffff",
    marginTop: 100,
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  avatar: {
    alignItems: "center",
    marginTop: -50,
  },
  sureName: {
    color: Colors.accent,
    fontFamily: "Poppins_400Regular",
    marginBottom: 10,
  },
  userName: {
    color: "#000000",
    fontFamily: "Poppins_500Medium",
    marginVertical: 5,
    marginTop: 20,
    fontSize: 22,
  },
  buttonContainer: {
    marginVertical: 20,
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    justifyContent: "space-between",
    marginHorizontal: 7,
    borderRadius: 5,
  },
  count: {
    fontSize: 24,
    color: Colors.accent,
    fontFamily: "Poppins_700Bold",
  },
  buttonTitle: {
    fontSize: 14,
    color: Colors.accent,
    fontFamily: "Poppins_400Regular",
  },
  options: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.inputBorder,
  },
  optionsTitle: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
  logo: {
    alignItems: "center",
  },
  logoText: {
    fontFamily: "Poppins_700Bold",
    marginBottom: 0,
    color: "#000000",
    fontSize: 18,
  },
  logoIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    color: "#000000",
    fontSize: 9,
  },
});

ProfileScreen.navigationOptions = {
  headerShown: false,
};
