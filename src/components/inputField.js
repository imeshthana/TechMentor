import React from "react";
import { TextInput, StyleSheet } from "react-native";

export const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  hasError = false,
}) => {
  return (
    <TextInput
      autoCapitalize="none"
      style={[styles.input, hasError && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff4444",
    borderWidth: 2,
  },
});
