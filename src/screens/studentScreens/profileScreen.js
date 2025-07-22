import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { PrimaryButton } from "../../components/primaryButton";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileScreen = () => {
  const user = {
    fullName: "John Doe",
    phone: "+94 712345678",
    email: "john@example.com",
    username: "john123",
  };

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>My Profile</Text>

        <Image
          source={require("../../assets/profile.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{user.fullName}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>

        <PrimaryButton title="Logout" onPress={handleLogout} />
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    alignSelf: "center"
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  detailContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#888",
  },
  value: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#6a11cb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
