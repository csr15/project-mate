import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const MapLoader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/location-marker.gif")}
        style={{
          width: 150,
          height: 150,
        }}
      />
      <Text style={styles.loaderText}>Fetching your current location...</Text>
    </View>
  );
};

export default MapLoader;

const styles = StyleSheet.create({
  loaderText: {
    color: "#000000",
    fontFamily: "Poppins_600SemiBold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
