import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { InputField } from "../../components/inputField";
import { PrimaryButton } from "../../components/primaryButton";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { blue, purple } from "../../utils/constants";
import { useRoute } from "@react-navigation/native";

export const StudentRegisterScreenStepTwo = () => {
  const route = useRoute();
  const { username, password, confirmPassword } = route.params;

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleFinalRegister = () => {
    console.log("Final Student Registration Data:", {
      username,
      password,
      confirmPassword,
      fullName,
      phoneNumber,
      email,
    });
    // TODO: Final submission logic
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Student Registration - Step 2</Text>

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
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
