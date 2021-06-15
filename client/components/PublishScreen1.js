import React, { useEffect, useState } from "react";
import {  Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import Button from "./Button";
import Input from "./Input";
import Popup from "./Popup";

const PublishScreen1 = (props) => {
  const [enteredValue, setEnteredValue] = useState({
    title: "",
    description: "",
    image: "",
    languages: [],
    previewURL: "",
    githubURL: "",
    role: "",
  });
  const [language, setLanguage] = useState("");
  const [developer, setDeveloper] = useState("");
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return state.publish;
  });

  useEffect(() => {
    setEnteredValue({
      title: state.title,
      description: state.description,
      languages: state.languages,
      previewURL: state.previewURL,
      githubURL: state.githubURL,
      image: state.imageURL,
      role: state.role,
    });
  }, [state]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA);
    if (result.status !== "granted") {
      setIsAlertError("You need to grant camera permissions to use this app.");
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync();

    if (!image.cancelled) {
      let newFile = {
        uri: image.uri,
        type: `test/${image.uri.split(".")[1]}`,
        name: `test.${image.uri.split(".")[1]}`,
      };

      setEnteredValue({ ...enteredValue, image: newFile });
    }
  };

  const dispatch = useDispatch();
  const nextHandler = () => {
    const { title, description, languages, role } = enteredValue;

    if (
      title !== "" &&
      description !== "" &&
      languages.length > 0 &&
      role !== ""
    ) {
      dispatch({ type: "SCREEN1", payload: enteredValue });
      props.navigation.navigate("Screen2");
    } else {
      setIsAlertError("Please fill all fields to go to next steps!");
    }
  };

  const addLanguagesHandler = () => {
    setEnteredValue({
      ...enteredValue,
      languages: [...enteredValue.languages, language],
    });
    setLanguage("");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Input
        label="Title"
        input={{
          placeholder: "Project title",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: enteredValue.title,
          onChangeText: (text) =>
            setEnteredValue({ ...enteredValue, title: text }),
        }}
      />
      <Input
        label="Description"
        input={{
          placeholder: "A brief description",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: enteredValue.description,
          multiline: true,
          onChangeText: (text) =>
            setEnteredValue({ ...enteredValue, description: text }),
        }}
      />
      <Input
        label="Programming Languages"
        style={{ marginBottom: 30 }}
        onClickHandler={addLanguagesHandler}
        icon={language ? "add" : null}
        input={{
          placeholder: "reactjs",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: language,
          onChangeText: (text) => setLanguage(text),
        }}
      />
      {enteredValue.languages && (
        <View style={styles.listContainer}>
          <ScrollView horizontal>
            {enteredValue.languages.map((lang, index) => (
              <View style={styles.list} key={index}>
                <Text style={styles.listText}>{lang}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
      <Input
        label="Role looking for"
        style={{ marginBottom: 30 }}
        input={{
          placeholder: "Frontend Developer",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: enteredValue.role,
          onChangeText: (text) =>
            setEnteredValue({ ...enteredValue, role: text }),
        }}
      />
      <Input
        label="Github Repository URL(optional)"
        style={{ marginBottom: 30 }}
        input={{
          placeholder: "https://github.com/username/repository",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: enteredValue.githubURL,
          onChangeText: (text) =>
            setEnteredValue({ ...enteredValue, githubURL: text }),
        }}
      />
      <Input
        label="Live Preview URL(optional)"
        style={{ marginBottom: 30 }}
        input={{
          placeholder: "https://example.com",
          autoCapitalize: "none",
          autoCompleteType: "off",
          value: enteredValue.previewURL,
          onChangeText: (text) =>
            setEnteredValue({ ...enteredValue, previewURL: text }),
        }}
      />
      {enteredValue.image ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: enteredValue.image.uri }}
          />
        </View>
      ) : null}
      {enteredValue.image ? (
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={takeImageHandler}
          >
            <Text style={styles.buttonText}>Repick an image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setEnteredValue({ ...enteredValue, image: "" })}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Button
          title="Pick an image"
          secondary
          clickHandler={takeImageHandler}
        />
      )}
      <Button
        title="Add Developers"
        clickHandler={nextHandler}
        iconName="arrow-forward"
      />

      {isAlertError ? (
        <Popup
          message={isAlertError}
          onClick={() => setIsAlertError("")}
        />
      ) : null}
    </ScrollView>
  );
};

export default PublishScreen1;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: "100%",
    height: 150,
    borderRadius: 7,
    backgroundColor: Colors.inputBorder,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonContainer: {
    width: Dimensions.get("window").width / 2.2,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.inputBorder,
    marginBottom: 15,
    marginTop: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Poppins_400Regular",
    color: "#000000",
  },
  listContainer: {
    marginTop: -25,
    marginBottom: 25,
  },
  list: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: "#f2f2f2",
  },
  listText: {
    color: Colors.listText,
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  nextButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: {
    color: "white",
    fontFamily: "Poppins_500Medium",
  },
});

PublishScreen1.navigationOptions = () => {
  return {
    cardStyle: {
      backgroundColor: "white",
    },
    headerTitle: () => {
      return (
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 16,
            color: "#000000",
          }}
        >
          Share a New Project
        </Text>
      );
    },
  };
};
