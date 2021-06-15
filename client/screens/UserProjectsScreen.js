import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  AsyncStorage,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";
import { fetchUserDetailsHandler } from "../store/action/profile-action";
import Message from "../components/Message";
import Popup from "../components/Popup";

const UserProjectsScreen = (props) => {
  const [isCompletedTab, setIsCompletedTab] = useState(false);
  const [onGoingProjects, setOngoingProjects] = useState("");
  const [completedProjects, setCompletedProjects] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return {
      userProjects: state.profile.userProjects,
      userDetails: state.profile.userDetails,
    };
  });

  const dispatch = useDispatch();

  const confirmCompleteHandler = (id) => {
    Alert.alert(
      "Completion confirmation",
      "If you mark this project as completed it will not shown to other users and also will not available to process",
      [
        { text: "cancel" },
        { text: "Complete", onPress: () => onCompletHandler(id) },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onCompletHandler = async (id) => {
    try {
      const { data } = await axios.patch(
        `${Proxy.proxy}/projects/complete_project/${id}`
      );

      dispatch(fetchUserDetailsHandler(state.userDetails._id));
    } catch (error) {
      setIsAlertError(
        "Problem occured while fetching projects, Please try again"
      );
    }
  };

  const confirmHideHandler = (id) => {
    Alert.alert(
      "Want To Hide?",
      "By hiding project it will not be shown to other users, You can also reset it",
      [
        { text: "cancel" },
        { text: "Hide", onPress: () => onHideProjectHandler(id) },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onHideProjectHandler = async (id) => {
    try {
      const { data } = await axios.patch(
        `${Proxy.proxy}/projects/hide_project/${id}`
      );

      userDetailsHandler();
    } catch (error) {
      setIsAlertError(
        "Problem occured while hiding projects, Please try again"
      );
    }
  };

  const onShowProjectHandler = async (id) => {
    try {
      const { data } = await axios.patch(
        `${Proxy.proxy}/projects/show_project/${id}`
      );

      userDetailsHandler();
    } catch (error) {
      setIsAlertError(
        "Problem occured while reseting project visibility, Please try again"
      );
    }
  };

  useEffect(() => {
    if (state.userProjects) {
      const transformedCompletedProjects = [];
      const transformedOnGoingProjects = [];
      state.userProjects.map((el) => {
        if (el.didCompleted) {
          transformedCompletedProjects.push(el);
        } else {
          transformedOnGoingProjects.push(el);
        }
      });

      setCompletedProjects(transformedCompletedProjects);
      setOngoingProjects(transformedOnGoingProjects);
    }
  }, [state.userProjects]);

  const userDetailsHandler = () => {
    setIsLoading(true);
    AsyncStorage.getItem("userDetails")
      .then((userDetails) => {
        const transformedData = JSON.parse(userDetails);
        console.log(transformedData);
        dispatch(fetchUserDetailsHandler(transformedData.uid))
          .then((_) => {
            setIsLoading(false);
            console.log("I am 1");
          })
          .catch((err) => {
            setIsLoading(false);
            setIsAlertError(
              "Problem occured while fetching user details, Please try again"
            );
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setIsAlertError(
          "Problem occured while fetching user details, Please try again"
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
        <View style={styles.navbar}>
          <TouchableWithoutFeedback
            style={[
              styles.nav,
              !isCompletedTab
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: "#000000",
                  }
                : {
                    border: "none",
                  },
            ]}
            onPress={() => setIsCompletedTab(false)}
          >
            <Text
              style={[
                styles.navTitle,
                !isCompletedTab
                  ? { color: "#000000" }
                  : { color: Colors.accent },
              ]}
            >
              Ongoing
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={[
              styles.nav,
              isCompletedTab
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: "#000000",
                  }
                : {
                    border: "none",
                  },
            ]}
            onPress={() => setIsCompletedTab(true)}
          >
            <Text
              style={[
                styles.navTitle,
                isCompletedTab
                  ? { color: "#000000" }
                  : { color: Colors.accent },
              ]}
            >
              Completed
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {!isCompletedTab ? (
        onGoingProjects ? (
          onGoingProjects.length > 0 ? (
            <FlatList
              data={onGoingProjects}
              onRefresh={userDetailsHandler}
              refreshing={isLoading}
              keyExtractor={(key, index) => key + index}
              renderItem={({ item, index }) => {
                return (
                  <ProjectCard
                    index={index}
                    isMyProjectsTab
                    onHide={confirmHideHandler.bind(this, item._id)}
                    onShow={onShowProjectHandler.bind(this, item._id)}
                    onCompleted={confirmCompleteHandler.bind(this, item._id)}
                    project={item}
                    navigation={props.navigation}
                  />
                );
              }}
            />
          ) : (
            <Message
              onRefresh={userDetailsHandler}
              refreshing={isLoading}
              data="You have not yet published any projects"
            />
          )
        ) : (
          <Loader size="large" color={Colors.primary} />
        )
      ) : completedProjects ? (
        completedProjects.length > 0 ? (
          <FlatList
            data={completedProjects}
            keyExtractor={(key, index) => key + index}
            onRefresh={userDetailsHandler}
            refreshing={isLoading}
            renderItem={({ item, index }) => {
              return (
                <ProjectCard
                  index={index}
                  project={item}
                  navigation={props.navigation}
                />
              );
            }}
          />
        ) : (
          <Message
            onRefresh={userDetailsHandler}
            refreshing={isLoading}
            data="You have not yet completed any projects"
          />
        )
      ) : (
        <Loader size="large" color={Colors.primary} />
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

export default UserProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
    marginVertical: 15,
    paddingTop: 20,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#e1e3e3",
  },
  nav: {
    marginRight: 25,
    paddingVertical: 10,
  },
  navTitle: {
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    color: Colors.accent,
  },
});

UserProjectsScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text
        style={{
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
          color: "#000000",
        }}
      >
        My Projects
      </Text>
    ),
  };
};

UserProjectsScreen.navigationOptions = {
  headerShown: false,
};
