import React from "react";
import { Image, StyleSheet, View } from "react-native";

export const BackgroundWrapper = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/glow_top.png")}
        style={styles.topRightGlow}
        resizeMode="contain"
      />

      <Image
        source={require("../assets/glow_left.png")}
        style={styles.bottomLeftGlow}
        resizeMode="contain"
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    zIndex: 0,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  topRightGlow: {
    position: "absolute",
    top: "auto",
    right: "-5%",
    width: 250,
    height: 250,
    zIndex: 1,
  },
  bottomLeftGlow: {
    position: "absolute",
    bottom: 40,
    left: "-35%",
    width: 350,
    height: 350,
    zIndex: 1,
  },
});
