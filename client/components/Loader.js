import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader = ({ size, color }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={size} color={color ? color : "black"} />
    </View>
  );
};

export default Loader;
