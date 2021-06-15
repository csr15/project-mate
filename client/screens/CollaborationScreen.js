import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import * as actions from "../store/action/profile-action";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Proxy from "../constants/Proxy";
import CollaboratedProjectCard from "../components/CollaboratedProjectCard";
import Message from "../components/Message";
import Popup from "../components/Popup";

const CollaborationScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestedTab, setIsRequestedTab] = useState(false);
  const [collaboratedProjects, setCollaboratedProjects] = useState("");
  const [requestedProjects, setRequestedProjects] = useState("");
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return {
      collaboratedProjects: state.profile.collaboratedProjects,
      userDetails: state.profile.userDetails,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    onFetchCollaborateList();
  }, []);

  const onFetchCollaborateList = () => {
    setIsLoading;
    dispatch(
      actions.fetchUserCollaboratedProjectsHandler(state.userDetails._id)
    )
      .then((_) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsAlertError(
          "Problem occured while fetcing collaborated projects, Please try again"
        );
      });
  };

  useEffect(() => {
    if (state.collaboratedProjects) {
      const transformedCollaboratedProjects = [];
      const transformedRequestedProjects = [];
      state.collaboratedProjects.map((el) => {
        if (el.status === "pending" || el.status === "denied") {
          transformedRequestedProjects.push(el);
        } else {
          transformedCollaboratedProjects.push(el);
        }
      });

      setCollaboratedProjects(transformedCollaboratedProjects);
      setRequestedProjects(transformedRequestedProjects);
    }
  }, [state.collaboratedProjects]);

  const confirmDeleteHandler = (data) => {
    Alert.alert(
      "Delete confirmation",
      "Are you sure to delete this request",
      [
        { text: "cancel" },
        { text: "delete", onPress: () => deleteRequestHandler(data) },
      ],
      {
        cancelable: true,
      }
    );
  };

  const deleteRequestHandler = async (data) => {
    try {
      await axios.delete(
        `${Proxy.proxy}/request/delete_request/${data._id}/${data.projectId}/${data.requestedUserId}`
      );
      onFetchCollaborateList();
    } catch (error) {
      setIsAlertError("Unable to delete, Please try again");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Collaborated Projects</Text>
        <View style={styles.navbar}>
          <TouchableWithoutFeedback
            style={[
              styles.nav,
              !isRequestedTab
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: "#000000",
                  }
                : {
                    border: "none",
                  },
            ]}
            onPress={() => setIsRequestedTab(false)}
          >
            <Text
              style={[
                styles.navTitle,
                !isRequestedTab
                  ? { color: "#000000" }
                  : { color: Colors.accent },
              ]}
            >
              Collaborated
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            style={[
              styles.nav,
              isRequestedTab
                ? {
                    borderBottomWidth: 2,
                    borderBottomColor: "#000000",
                  }
                : {
                    border: "none",
                  },
            ]}
            onPress={() => setIsRequestedTab(true)}
          >
            <Text
              style={[
                styles.navTitle,
                isRequestedTab
                  ? { color: "#000000" }
                  : { color: Colors.accent },
              ]}
            >
              Requested
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {!isRequestedTab && collaboratedProjects ? (
        collaboratedProjects.length > 0 ? (
          <FlatList
            data={collaboratedProjects}
            keyExtractor={(key, index) => key + index}
            onRefresh={onFetchCollaborateList}
            refreshing={isLoading}
            renderItem={({ item, index }) => {
              return <CollaboratedProjectCard item={item} index={index} />;
            }}
          />
        ) : (
          <Message
            onRefresh={onFetchCollaborateList}
            refreshing={isLoading}
            data="You have not yet collaborated with anyone"
          />
        )
      ) : requestedProjects ? (
        requestedProjects.length > 0 ? (
          <FlatList
            data={requestedProjects}
            keyExtractor={(key, index) => key + index}
            onRefresh={onFetchCollaborateList}
            refreshing={isLoading}
            renderItem={({ item, index }) => {
              return (
                <CollaboratedProjectCard
                  item={item}
                  index={index}
                  isReqTab
                  confirmDeleteHandler={confirmDeleteHandler.bind(this, item)}
                />
              );
            }}
          />
        ) : (
          <Message
            onRefresh={onFetchCollaborateList}
            refreshing={isLoading}
            data="You have not yet send any collaboration requests"
          />
        )
      ) : (
        <Loader size="large" color={Colors.secondary} />
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

export default CollaborationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 15,
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
});

CollaborationScreen.navigationOptions = {
  headerShown: false,
};
