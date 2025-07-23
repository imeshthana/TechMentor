import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { lightBlue, lightPurple } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { PrimaryButton } from "../components/primaryButton";

export const LandingScreen = () => {
  const navigation = useNavigation();

  const navigateSignIn = () => {
    navigation.navigate("SignIn");
  };

  const navigateInstructorRegister = () => {
    navigation.navigate("RegisterStepOne", { role: "instructor" });
  };

  const navigateStudentRegister = () => {
    navigation.navigate("RegisterStepOne", { role: "student" });
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo_bg.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.appName}>TechMentor</Text>

        <Text style={styles.slogan}>
          Empowering Tech Learning, One Course at a Time
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Sign In"
            onPress={navigateSignIn}
            backgroundColor={lightBlue}
          />
          <PrimaryButton
            title="Register as Student"
            onPress={navigateStudentRegister}
            backgroundColor={lightPurple}
          />
          <PrimaryButton
            title="Register as Instructor"
            onPress={navigateInstructorRegister}
            backgroundColor={lightPurple}
          />
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  slogan: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 10,
    marginBottom: "40%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
  },
});
