import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

import * as actions from "../store/action/project-action";
import Loader from "../components/Loader";
import Colors from "../constants/Colors";
import Avatar from "../components/Avatar";
import UserCard from "../components/UserCard";
import Proxy from "../constants/Proxy";

const ViewProjectScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProjectDetails();

    return () => {
      dispatch({ type: "RESET_PROJECT_DETAILS" });
    };
  }, [dispatch]);

  const projectData = useSelector((state) => state.projects.projectDetails);
  const userDetails = useSelector((state) => state.profile.userDetails);

  const fetchProjectDetails = () => {
    setIsLoading(true);
    const projectId = props.navigation.getParam("projectId");
    dispatch(actions.fetchProjectDetailsHandler(projectId))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert(
          "Problem Occured",
          "Something went wrong on fetchin project details, Please try again!"
        );
      });
  };

  const onCollaborate = async () => {
    setIsSending(true);
    const requestData = {
      publisherId: projectData.uid,
      publisherName: projectData.userName,
      projectTitle: projectData.title,
      projectId: projectData._id,
      requestedUserId: userDetails._id,
      requesterUserName: userDetails.userName,
    };

    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/request/${projectData._id}`,
        {
          data: requestData,
        }
      );

      fetchProjectDetails();
      setIsSending(false);
    } catch (error) {
      Alert.alert("Problem occured", error.message);
      setIsSending(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {projectData === "" ? (
        <View
          style={{
            height: Dimensions.get("window").height / 1.1,
          }}
        >
          <Loader size="large" color={Colors.secondary} />
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <ImageBackground
              source={{
                uri: projectData.imageURL
                  ? projectData.imageURL
                  : "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
              }}
              style={styles.image}
            >
              <LinearGradient
                // Background Linear Gradient
                colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.3)"]}
                start={{ x: 0.1, y: 0.1 }}
                end={{ x: 0, y: 0 }}
                style={styles.linearGradient}
              ></LinearGradient>
            </ImageBackground>
          </View>
          <View style={styles.content}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Avatar title={projectData.userName} width={45} height={45} />
              </View>
              <View style={styles.avatarContent}>
                <Text style={styles.userName} numberOfLines={1}>
                  {projectData.userName}
                </Text>
                <Text style={styles.date} numberOfLines={1}>
                  {moment(projectData.createdAt).from()}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>{projectData.title}</Text>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{projectData.description}</Text>
            <Text style={styles.sectionTitle}>Developers</Text>
            {projectData.developers.map((el, index) => {
              return <UserCard name={el.name} role={el.role} key={index} />;
            })}
            <Text style={styles.sectionTitle}>Programming Languages</Text>
            <ScrollView horizontal>
              {projectData.programmingLanguage.map((el, index) => {
                return (
                  <View style={styles.languageContainer} key={index}>
                    <Text style={styles.language}>{el}</Text>
                  </View>
                );
              })}
            </ScrollView>
            <Text style={styles.sectionTitle}>External Links</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.button,
                  projectData.githubURL ? { opacity: 1 } : { opacity: 0.5 },
                ]}
                disabled={!projectData.githubURL}
                onPress={() => Linking.openURL("https://github.com")}
              >
                <Text style={styles.buttonText}>Github</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                style={[
                  styles.button,
                  projectData.previewURL ? { opacity: 1 } : { opacity: 0.5 },
                ]}
                disabled={!projectData.previewURL}
                onPress={() => Linking.openURL("https://github.com")}
              >
                <Text style={styles.buttonText}>Preview</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Developer Location</Text>
            <TouchableOpacity style={styles.mapContainer}>
              <MapView
                onPress={() => {
                  props.navigation.navigate("MapPreview", {
                    mapData: {
                      lat: projectData.location.coordinates[1],
                      lng: projectData.location.coordinates[0],
                      developers: projectData.developers.length,
                      title: projectData.title,
                    },
                  });
                }}
                style={{ flex: 1 }}
                style={StyleSheet.absoluteFillObject}
                onMapReady={() => setIsMapReady(true)}
                initialRegion={{
                  latitude: projectData.location.coordinates[1],
                  longitude: projectData.location.coordinates[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {isMapReady ? (
                  <Marker
                    key={123}
                    coordinate={{
                      latitude: projectData.location.coordinates[1],
                      longitude: projectData.location.coordinates[0],
                    }}
                    title={projectData.title}
                    description={`${projectData.developers.length} developers`}
                  />
                ) : null}
              </MapView>
            </TouchableOpacity>
            {projectData.uid !== userDetails._id &&
            !projectData.collaborators.includes(userDetails._id) ? (
              <TouchableOpacity
                disabled={projectData.collaborationRequestedUsers.includes(
                  userDetails._id
                )}
                style={[
                  styles.collaborateButton,
                  projectData.collaborationRequestedUsers.includes(
                    userDetails._id
                  )
                    ? { opacity: 0.7 }
                    : { opacity: 1 },
                ]}
                onPress={onCollaborate}
              >
                {isSending ? (
                  <Loader size="small" color="white" />
                ) : (
                  <Text style={styles.collaborateButtonText}>
                    {projectData.collaborationRequestedUsers.includes(
                      userDetails._id
                    )
                      ? "Request Pending"
                      : "Collaborate"}
                  </Text>
                )}
              </TouchableOpacity>
            ) : null}
            {/* <Button
              secondary
              title="Report Project"
              style={{ flex: 0, marginTop: 15 }}
              clickHandler={null}
            /> */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default ViewProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 200,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  linearGradient: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },

  avatar: {
    flexDirection: "row",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 15,
    paddingHorizontal: 7,
  },
  avatar: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarContent: {
    width: "90%",
    paddingLeft: 15,
  },
  userName: {
    fontFamily: "Poppins_500Medium",
    color: "#000000",
    textTransform: "capitalize",
  },
  date: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    textTransform: "capitalize",
    marginTop: -2,
  },
  sectionTitle: {
    marginTop: 30,
    marginBottom: 6,
    fontFamily: "Poppins_500Medium",
    textTransform: "capitalize",
    fontSize: 16,
    color: "#000000",
  },
  description: {
    marginBottom: 5,
    fontFamily: "Poppins_400Regular",
    color: "#676565",
    fontSize: 14,
    lineHeight: 24,
  },
  languageContainer: {
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  language: {
    fontFamily: "Poppins_500Medium",
    color: Colors.accent,
    textTransform: "capitalize",
  },
  buttonGroup: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: Dimensions.get("window").width / 2.3,
    flex: 1,
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    color: Colors.primary,
    textTransform: "uppercase",
  },
  mapContainer: {
    width: "100%",
    height: 150,
    borderRadius: 7,
    overflow: "hidden",
  },
  collaborateButton: {
    paddingHorizontal: Dimensions.get("window").width / 15,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  collaborateButtonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

ViewProjectScreen.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 16,
          color: "#000000",
        }}
      >
        About Project
      </Text>
    ),
    cardStyle: {
      backgroundColor: "#ffffff",
    },
    headerBackImage: () => (
      <TouchableOpacity>
        <Ionicons name="chevron-back-outline" size={24} color="#000000" />
      </TouchableOpacity>
    ),
    tabBarVisible: false,
  };
};
