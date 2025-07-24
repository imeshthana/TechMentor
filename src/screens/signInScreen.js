import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { blue } from "../utils/constants";
import { InputField } from "../components/inputField";
import { PrimaryButton } from "../components/primaryButton";
import { useSignIn } from "../hooks/useAuthApi";
import { AuthContext } from "../contexts/authContext";

export const SignInScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const validateFields = () => {
    const newErrors = { username: "", password: "" };

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e !== "");
  };

  const handleSuccess = async (data) => {
    const { accessToken, refreshToken, user } = data;
    await login(accessToken, refreshToken, user.id, data.role);

    if (data.role === "student") {
      navigation.navigate("StudentBottomTab");
    } else if (data.role === "instructor") {
      navigation.navigate("InstructorBottomTab");
    }
  };

  const handleError = (err) => {
    console.log("Login failed:", err?.response?.data || err.message);
    Alert.alert("Login Failed", "Invalid credentials or network error.");
  };

  const { mutate, status } = useSignIn(handleSuccess, handleError);

  const handleSignIn = () => {
    if (validateFields()) {
      mutate({ username, password });
    }
  };

  const goToRegister = () => navigation.navigate("Landing");

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Sign In</Text>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            hasError={!!errors.username}
          />
          {errors.username ? (
            <Text style={styles.errorText}>{errors.username}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            hasError={!!errors.password}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {status === "loading" ? (
          <ActivityIndicator size="large" color={blue} />
        ) : (
          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            backgroundColor={blue}
          />
        )}

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
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    marginLeft: 5,
    fontSize: 12,
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "#444",
  },
  registerLink: {
    color: blue,
    fontWeight: "bold",
  },
});
