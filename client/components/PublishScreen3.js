import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";

import Button from "../components/Button";
import * as actions from "../store/action/publish-action";
import { getLocationHandler } from "./LocationHandler";
import MapLoader from "./MapLoader";

export default function PublishScreen3(props) {
  const [isFetching, setIsFetching] = React.useState(false);
  const [pickedLocation, setPickedLocation] = React.useState();
  const [isPublishing, setIspublishing] = React.useState(false);
  const [isAlertError, setIsAlertError] = React.useState("");

  const state = useSelector((state) => {
    return {
      publish: state.publish,
      profile: state.profile,
    };
  });

  React.useEffect(() => {
    if (state.profile.userLocation === "") {
      fetchLocation();
    } else {
      setPickedLocation(state.profile.userLocation);
    }
  }, [state.publish]);

  const dispatch = useDispatch();
  const fetchLocation = async () => {
    try {
      const currentLocation = await getLocationHandler();

      setPickedLocation(currentLocation.location);
      dispatch({ type: "USER_LOCATION", payload: currentLocation.location });
    } catch (error) {
      setIsAlertError("Can't fetch location please try again");
    }
  };

  const resetStackAndNavigate = () => {
    const screenAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Screen1" })],
    });
    props.navigation.dispatch(screenAction);
  };

  const publishHandler = async () => {
    setIspublishing(true);
    if (state.publish.imageURL) {
      const imageURL = await cloudinaryUpload(state.publish.imageURL);

      const projectDetails = {
        title: state.publish.title,
        description: state.publish.description,
        programmingLanguage: state.publish.languages,
        location: {
          type: "Point",
          coordinates: [pickedLocation.longitude, pickedLocation.latitude],
        },
        developers: state.publish.developers,
        imageURL: imageURL,
        githubURL: state.publish.githubURL,
        previewURL: state.publish.previewURL,
        uid: state.profile.userDetails._id,
        userName: state.profile.userDetails.userName,
        avatar: state.profile.userDetails.avatar,
      };

      dispatch(actions.publishProjectHandler(projectDetails))
        .then(() => {
          setIspublishing(false);
          props.navigation.navigate("ProfileScreen");
        })
        .catch((err) => {
          setIspublishing(false);
          setIsAlertError("Problem occured while publishing, Please try again");
        });
    } else {
      const projectDetails = {
        title: state.publish.title,
        description: state.publish.description,
        programmingLanguage: state.publish.languages,
        location: {
          type: "Point",
          coordinates: [pickedLocation.longitude, pickedLocation.latitude],
        },
        developers: state.publish.developers,
        imageURL: "",
        githubURL: state.publish.githubURL,
        previewURL: state.publish.previewURL,
        uid: state.profile.userDetails._id,
        userName: state.profile.userDetails.userName,
        avatar: state.profile.userDetails.avatar,
      };

      dispatch(actions.publishProjectHandler(projectDetails))
        .then(() => {
          setIspublishing(false);
          props.navigation.navigate("ProfileScreen");
        })
        .catch((err) => {
          setIspublishing(false);
          setIsAlertError("Problem occured while publishing, Please try again");
        });
    }
  };

  const cloudinaryUpload = async (photo) => {
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", "demo-project");
    data.append("cloud_name", "csrfamily");

    try {
      const result = await fetch(
        "https://api.cloudinary.com/v1_1/csrfamily/image/upload",
        {
          body: data,
          method: "POST",
        }
      );

      const transformedData = await result.json();
      return transformedData.secure_url;
    } catch (error) {
      setIsAlertError("Problem occured while publishing, Please try again");
      return false;
    }
  };

  return (
    <>
      {pickedLocation ? (
        isPublishing ? (
          <View style={styles.container}>
            <Image
              source={require("../assets/images/upload.gif")}
              style={styles.uploadImg}
            />
            <Text style={styles.loaderText}>
              Your project is publishing...!
            </Text>
          </View>
        ) : (
          <View style={StyleSheet.absoluteFillObject}>
            <MapView
              style={StyleSheet.absoluteFillObject}
              initialRegion={{
                latitude: pickedLocation.latitude,
                longitude: pickedLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                key={123}
                coordinate={pickedLocation}
                title={state.publish.title}
                description={`${state.publish.developers.length} developers`}
              />
            </MapView>
            <View style={styles.buttonGroup}>
              <Button
                title="Previous"
                secondary
                style={{ marginHorizontal: 10, flex: 1 }}
                clickHandler={() => props.navigation.goBack()}
              />
              <Button
                title="Publish"
                style={{ marginHorizontal: 10, flex: 1 }}
                clickHandler={publishHandler}
              />
            </View>

            {isAlertError ? (
              <Popup
                message={isAlertError}
                error
                onClick={() => setIsAlertError("")}
              />
            ) : null}
          </View>
        )
      ) : (
        <MapLoader />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  buttonGroup: {
    position: "absolute",
    top: "90%",
    left: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  uploadImg: {
    width: 100,
    height: 100,
  },
});

PublishScreen3.navigationOptions = () => {
  return {
    headerShown: false,
    cardStyle: {
      backgroundColor: "white",
    },
  };
};
