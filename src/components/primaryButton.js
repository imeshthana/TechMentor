import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { purple } from "../utils/constants";

export const PrimaryButton = ({
  title,
  onPress,
  backgroundColor = purple,
  disable
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={disable}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
