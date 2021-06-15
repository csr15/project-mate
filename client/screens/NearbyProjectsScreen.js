import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import * as actions from "../store/action/project-action";
import { getLocationHandler } from "../components/LocationHandler";
import ProjectCard from "../components/ProjectCard";
import Colors from "../constants/Colors";
import Loader from "../components/Loader";
import Message from "../components/Message";
import SetDistance from "../components/SetDistance";
import MapLoader from "../components/MapLoader";

const NearbyProjectsScreen = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isErrorOnFetching, setIsErrorOnFetching] = useState(false);
  const [distance, setDistance] = useState(5);
  const [showHeader, setShowHeader] = useState(false);
  const [limit, setLimit] = useState(5);

  const state = useSelector((state) => {
    return {
      profile: state.profile,
      projects: state.projects.projectsNear,
    };
  });

  useEffect(() => {
    if (state.projects === "") {
      fetchProjectsHandler();
    }
  }, []);

  const dispatch = useDispatch();
  const fetchProjectsHandler = () => {
    if (state.profile.userLocation === "") {
      const locationHander = getLocationHandler();
      locationHander
        .then(({ location }) => {
          dispatch({ type: "USER_LOCATION", payload: location });
          dispatch(
            actions.fetchProjectsNearHandler(location, distance * 1000, limit)
          )
            .then(() => {
              setIsErrorOnFetching(false);
            })
            .catch((err) => {
              setIsErrorOnFetching(true);
            });
        })
        .catch((err) => {
          setIsErrorOnFetching(true);
        });
    } else {
      dispatch(
        actions.fetchProjectsNearHandler(
          state.profile.userLocation,
          distance * 1000,
          limit
        )
      )
        .then(() => {
          setIsErrorOnFetching(false);
        })
        .catch((err) => {
          setIsErrorOnFetching(true);
        });
    }
  };

  return (
    <View style={styles.container}>
      {isFetching ? (
        <MapLoader />
      ) : isErrorOnFetching ? (
        <Message
          onRefresh={null}
          refreshing={null}
          fetchProjectsHandler={fetchProjectsHandler}
          isError
          data="OOPS!!, Problem occured while fetching projects, Please Try again"
        />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Nearby Projects</Text>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => setShowHeader(true)}
            >
              <Ionicons name="location-sharp" style={styles.icon} />
              <Text style={styles.iconText}>{distance}Km</Text>
            </TouchableOpacity>
          </View>
          {state.projects.length > 0 ? (
            <FlatList
              data={state.projects}
              refreshing={isFetching}
              onRefresh={fetchProjectsHandler}
              keyExtractor={(key, index) => key + index}
              onEndReached={() => {
                setLimit(limit + 5);
                fetchProjectsHandler();
              }}
              renderItem={({ item, index }) => {
                return (
                  <ProjectCard
                    index={index}
                    project={item}
                    isNearbyProject
                    distance={distance}
                    navigation={props.navigation}
                  />
                );
              }}
            />
          ) : (
            <View style={styles.noProjectsContainer}>
              <Text style={styles.messageTitle}>No projects nearby you</Text>
              <Text style={styles.message}>Try changing the distance</Text>
              <TouchableOpacity
                style={[styles.button, { flex: 0, marginTop: 20 }]}
                onPress={() => {
                  setShowHeader(true);
                }}
              >
                <Text style={styles.buttonText}>Change Distance</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {showHeader && (
        <SetDistance
          hideModal={() => setShowHeader(false)}
          showHeader={showHeader}
          setDistance={(dist) => setDistance(dist)}
          distance={distance}
          fetchProjectsHandler={fetchProjectsHandler}
        />
      )}
    </View>
  );
};

export default NearbyProjectsScreen;

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
  headerIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    color: "#000000",
  },
  iconText: {
    fontSize: 14,
    paddingRight: 5,
    color: "#000000",
    fontFamily: "Poppins_400Regular",
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

NearbyProjectsScreen.navigationOptions = {
  headerShown: false,
};
