import React from "react";
import { Text, View } from "react-native";

import Colors from "../constants/Colors";

const Avatar = ({ title, width, height, fontSize }) => {
  return (
    <View
      style={{
        width: width ? width : 35,
        height: height ? height : 35,
        borderRadius: 1000,
        backgroundColor: "#d9e6ff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: Colors.primary,
          textTransform: "uppercase",
          fontSize: fontSize ? fontSize : 14,
        }}
      >
        {title ? title.charAt(0) : "A"}
      </Text>
    </View>
  );
};

export default Avatar;
