import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

import Button from "../components/Button";
import Colors from "../constants/Colors";
import Input from "./Input";
import Avatar from "./Avatar";
import UserCard from "./UserCard";
import Popup from "./Popup";

const PublishScreen2 = (props) => {
  const [allDevelopers, setAllDevelopers] = useState([]);
  const [developer, setDeveloper] = useState("");
  const [role, setRole] = useState("");
  const [isAlertError, setIsAlertError] = useState("");

  const state = useSelector((state) => {
    return state.publish;
  });

  useEffect(() => {
    setAllDevelopers(state.developers);
  }, [state]);

  const addDevelopersHandler = () => {
    setAllDevelopers([
      ...allDevelopers,
      {
        name: developer,
        role: role,
      },
    ]);
    setDeveloper("");
    setRole("");
  };

  const dispatch = useDispatch();
  const nextHandler = () => {
    if (allDevelopers.length > 0) {
      dispatch({ type: "SCREEN2", payload: allDevelopers });
      props.navigation.navigate("Screen3");
    } else {
      setIsAlertError(
        "Please add atleast one developer to continue to next step"
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="never"
    >
      <View style={styles.allDevelopersContainer}>
        {allDevelopers.length > 0 ? (
          allDevelopers.map((el, index) => {
            return <UserCard name={el.name} role={el.role} key={index} />;
          })
        ) : (
          <Text style={styles.developerCount}>No Developers</Text>
        )}
      </View>

      <View style={styles.addDevelopersContainer}>
        <Input
          label="Developer Name"
          style={{ marginBottom: 20 }}
          input={{
            placeholder: "John Doe",
            autoCapitalize: "none",
            autoCompleteType: "off",
            value: developer,
            onChangeText: (text) => setDeveloper(text),
          }}
        />
        <Input
          label="Role"
          style={{ marginBottom: 20 }}
          onClickHandler={addDevelopersHandler}
          input={{
            placeholder: "Full-Stack Developer",
            autoCapitalize: "none",
            autoCompleteType: "off",
            value: role,
            onChangeText: (text) => setRole(text),
            onSubmitEditing: addDevelopersHandler,
          }}
        />
        <TouchableOpacity
          style={[
            styles.button,
            developer === "" ? { opacity: 0.5 } : { opacity: 1 },
            role === "" ? { opacity: 0.5 } : { opacity: 1 },
          ]}
          onPress={addDevelopersHandler}
          disabled={developer === "" || role === ""}
        >
          <Text style={styles.buttonText}>Add Developer</Text>
        </TouchableOpacity>
        <Button
          title="Pin a Location"
          style={{ marginBottom: 10 }}
          clickHandler={nextHandler}
          iconName="arrow-forward"
        />
      </View>
      {isAlertError ? (
        <Popup message={isAlertError} error onClick={() => setIsAlertError("")} />
      ) : null}
    </ScrollView>
  );
};

export default PublishScreen2;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    backgroundColor: "transparent",
    marginHorizontal: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.primary,
    fontFamily: "Poppins_500Medium",
  },
  developersContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EDF0F6",
    padding: 10,
  },
  avatar: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  developer: {
    width: "90%",
    paddingLeft: 10,
  },
  developerName: {
    fontFamily: "Poppins_500Medium",
    color: "#000000",
    textTransform: "capitalize",
  },
  developerRole: {
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
    textTransform: "capitalize",
    marginTop: -2,
  },
  developerCount: {
    fontFamily: "Poppins_500Medium",
    color: Colors.accent,
    textAlign: "center",
    marginTop: Dimensions.get("window").height / 5,
  },
});

PublishScreen2.navigationOptions = () => {
  return {
    headerTitle: () => (
      <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
        Add Developers
      </Text>
    ),
    cardStyle: {
      backgroundColor: "white",
    },
  };
};
