import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Animated } from "react-native";

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export class Animation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  _renderScrollViewContent = () => {
    const data = Array.from({ length: 30 });

    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => {
          return (
            <View key={i} style={styles.row}>
              <Text>{i}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    return (
      <View style={styles.fill}>
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } },
          ])}
        >
          {this._renderScrollViewContent()}
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <View style={styles.bar}>
            <Text style={styles.title}>Title</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

export default Animation;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#03A9F4",
    overflow: "hidden",
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    backgroundColor: "transparent",
    color: "white",
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
});
