import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import * as actions from "../store/action/project-action";
import Loader from "../components/Loader";
import ProjectCard from "../components/ProjectCard";
import Colors from "../constants/Colors";
import Search from "../components/Search";
import Popup from "../components/Popup";

const AllProjectsScreen = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [limit, setLimit] = useState( 5);
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return {
      profile: state.profile,
      projects: state.projects.allProjects,
      searchResults: state.search.searchResults,
    };
  });

  useEffect(() => {
    if (state.projects === "") {
      fetchProjects();
    }
  }, []);

  const dispatch = useDispatch();

  const fetchProjects = () => {
    setIsFetching(true);
    fetchAllProjects()
      .then((_) => {
        setIsFetching(false);
      })
      .catch(() => {
        setIsFetching(false);
      });
  };

  const fetchAllProjects = () => {
    return dispatch(actions.fetchAllProjectsHandler(limit))
      .then(() => {
        return true;
      })
      .catch((err) => {
        setIsAlertError(
          "Problem occured while fetcing projects, Please try again"
        );
      });
  };

  return (
    <View style={styles.container}>
      {isFetching ? (
        <Loader size="large" color={Colors.secondary} />
      ) : state.projects.length > 0 ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>All Projects</Text>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Ionicons name="md-search-outline" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={state.projects}
            refreshing={isFetching}
            onRefresh={fetchProjects}
            onEndReached={() => {
              setLimit(limit + 5);
              fetchAllProjects();
            }}
            onEndReachedThreshold={0.7}
            keyExtractor={(key, index) => key + index}
            renderItem={({ item, index }) => (
              <ProjectCard
                index={index}
                project={item}
                navigation={props.navigation}
              />
            )}
          />
        </>
      ) : (
        <FlatList
          data={["Try refreshing..!"]}
          refreshing={isFetching}
          onRefresh={fetchAllProjects}
          keyExtractor={(key, index) => key + index}
          renderItem={({ item }) => (
            <Text
              style={{
                ...styles.modalDate,
                marginTop: Dimensions.get("window").height / 2,
                fontSize: 16,
              }}
            >
              {item}
            </Text>
          )}
        />
      )}

      {showModal && (
        <Search
          showModal={showModal}
          onHideModal={() => {
            setShowModal(false);
          }}
          navigation={props.navigation}
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

export default AllProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    marginTop: 15,
    marginBottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 24,
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
    marginTop: 5,
    marginBottom: 5,
  },
  icon: {
    fontSize: 22,
    color: Colors.accent,
    paddingRight: 5,
  },
});

AllProjectsScreen.navigationOptions = {
  headerShown: false,
};
