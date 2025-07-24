import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { InputField } from "../components/inputField";
import { PrimaryButton } from "../components/primaryButton";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { blue, purple } from "../utils/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRegister } from "../hooks/useAuthApi";

export const RegisterScreenStepTwo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username, password, confirmPassword, role } = route.params;
  console.log("Received data:", {
    username,
    password,
    role,
  });

  const [fullname, setfullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    fullname: "",
    phone: "",
    email: "",
  });

  const validateFields = () => {
    const newErrors = {
      fullname: "",
      phone: "",
      email: "",
    };

    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSuccess = () => {
    console.log("Registration successful");
    Alert.alert("Registration Successful", "You can now sign in.");
    navigation.navigate("SignIn");
  };

  const handleError = () => {
    console.log("Registration failed");
    Alert.alert("Registration Failed", "Please try again.");
  };

  const { mutate, status } = useRegister(handleSuccess, handleError);

  const handleFinalRegister = () => {
    if (validateFields()) {
      mutate({
        username,
        password,
        fullname,
        phone,
        email,
        role,
      });
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Register as {role}</Text>
        <Text style={styles.subtitle}>Step 2</Text>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Full Name"
            value={fullname}
            onChangeText={setfullname}
            hasError={!!errors.fullname}
          />
          {errors.fullname ? (
            <Text style={styles.errorText}>{errors.fullname}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            hasError={!!errors.phone}
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <InputField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            hasError={!!errors.email}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        {status === "loading" ? (
          <ActivityIndicator size="large" color={purple} />
        ) : (
          <PrimaryButton
            title="Register"
            onPress={handleFinalRegister}
            backgroundColor={purple}
          />
        )}
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
  inputContainer: {
    width: "100%",
    marginBottom: 5,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
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
