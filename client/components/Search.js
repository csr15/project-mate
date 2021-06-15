import moment from "moment";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../constants/Colors";
import Loader from "./Loader";
import { searchHandler } from "../store/action/search-action";

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [loader, setLoader] = useState(false);

  const searchResults = useSelector((state) => state.search.searchResults);

  const dispatch = useDispatch();
  const searchResultsHandler = () => {
    Keyboard.dismiss();
    setLoader(true);
    dispatch(searchHandler(searchValue.toLowerCase()))
      .then((_) => setLoader(false))
      .catch((err) => setLoader(false));
  };

  return (
    <Modal visible={props.showModal} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.modalResult}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {!loader ? (
              searchResults ? (
                searchResults.length > 0 ? (
                  searchResults.map((el, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.resultContainer}
                        key={index}
                        onPress={() => {
                          props.onHideModal();
                          setSearchValue("");
                          dispatch({ type: "RESET_SEARCH" });
                          props.navigation.navigate("ViewProject", {
                            projectId: el._id,
                          });
                        }}
                      >
                        <Text
                          key={index}
                          style={styles.result}
                          numberOfLines={2}
                        >
                          {el.title}
                        </Text>
                        <View style={styles.modalResultBottom}>
                          <Text style={styles.modalAuthor}>
                            {el.developers.length} Developers
                          </Text>
                          <View style={styles.spacer}></View>
                          <Text style={styles.modalDate}>
                            {moment(el.createdAt).fromNow()}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      color: Colors.accent,
                      textAlign: "center",
                      marginTop: Dimensions.get("window").height / 3,
                    }}
                  >
                    No languages found!, Try different
                  </Text>
                )
              ) : null
            ) : (
              <Loader size="large" color={Colors.secondary} />
            )}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setSearchValue(text)}
              value={searchValue}
              placeholder="react js"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
            />
            <View style={styles.searchIconContainer}>
              <TouchableOpacity
                onPress={searchValue ? searchResultsHandler : null}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: Colors.accent,
                    fontFamily: "Poppins_500Medium",
                    marginRight: 10,
                  }}
                >
                  SEARCH
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modalHeader}
            onPress={() => {
              props.onHideModal();
              dispatch({ type: "RESET_SEARCH" });
              setSearchValue("");
            }}
          >
            <Text style={styles.modalTitle}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Search;

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 10,
  },
  modalHeader: {
    justifyContent: "space-between",
  },
  modalTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    textAlign: "center",
    color: Colors.accent,
    marginTop: 10,
  },
  modalResult: {
    height: "85%",
  },
  resultContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e3e8e5",
  },
  result: {
    fontFamily: "Poppins_400Regular",
    color: "#000000",
  },
  footer: {
    height: "15%",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e7e8",
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: "Poppins_400Regular",
  },
  searchIconContainer: {
    width: "20%",
    alignItems: "center",
  },
  spacer: {
    width: 3,
    height: 3,
    backgroundColor: "#9FACC8",
    marginHorizontal: 12,
    opacity: 0.7,
    borderRadius: 100,
  },
  modalResultBottom: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  modalAuthor: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
  modalDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: Colors.accent,
  },
});
