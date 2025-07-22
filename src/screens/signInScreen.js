import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { blue, purple } from "../utils/constants";
import { InputField } from "../components/inputField";
import { PrimaryButton } from "../components/primaryButton";

export const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate("StudentBottomTab");
  };

  const goToRegister = () => {
    navigation.navigate("Landing");
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign In</Text>

        <InputField
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <PrimaryButton
          title="Sign In"
          onPress={handleSignIn}
          backgroundColor={blue}
        />

        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>Register</Text>
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
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
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
