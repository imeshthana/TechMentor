import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { InputField } from "../components/inputField";
import { PrimaryButton } from "../components/primaryButton";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { blue, purple } from "../utils/constants";
import { useRoute } from "@react-navigation/native";

export const RegisterScreenStepTwo = () => {
  const route = useRoute();
  const { username, password, confirmPassword, role } = route.params;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleFinalRegister = () => {
    console.log("Registration Data:", {
      username,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      email,
    });
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Register as {role}</Text>
        <Text style={styles.subtitle}>Step 2</Text>

        <InputField
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <InputField
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <InputField placeholder="Email" value={email} onChangeText={setEmail} />

        <PrimaryButton
          title="Register"
          onPress={handleFinalRegister}
          backgroundColor={purple}
        />
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 125,
    height: 125,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  registerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    color: blue,
    fontWeight: "bold",
  },
});
