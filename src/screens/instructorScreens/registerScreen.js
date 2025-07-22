import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { InputField } from "../../components/inputField";
import { PrimaryButton } from "../../components/primaryButton";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { blue, purple } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";

export const InstructorRegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    console.log("Registering Instructor:", {
      username,
      password,
      confirmPassword,
    });
  };

  const goToSignin = () => {
    navigation.navigate("SignIn");
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Register as Instructor</Text>

        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <InputField
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <PrimaryButton
          title="Register"
          onPress={handleRegister}
          backgroundColor={purple}
        />
        <TouchableOpacity onPress={goToSignin}>
          <Text style={styles.registerText}>
            Already have an account?{" "}
            <Text style={styles.registerLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
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
