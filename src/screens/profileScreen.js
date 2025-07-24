import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { PrimaryButton } from "../components/primaryButton";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "../components/title";
import { AuthContext } from "../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import { purple } from "../utils/constants";
import { useProfile } from "../hooks/useAuthApi";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const { logout, authData } = useContext(AuthContext);
  const [profileData, setProfileData] = useState();

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleSuccess = () => {
    console.log("Profile fetched successfully");
  };

  const handleError = (error) => {
    console.error("Error fetching profile:", error);
    Alert.alert("Error", "Failed to load profile. Please try again later.");
  };

  const { data, isLoading } = useProfile(
    authData?.userId,
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (data) {
      setProfileData(data.user);
    }
  }, [data]);

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"Profile"} />

        {isLoading || !profileData ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : (
          <>
            <Image
              source={require("../assets/profile.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{profileData?.fullname}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{profileData.phone}</Text>
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{profileData.email}</Text>
            </View>

            <PrimaryButton title="Logout" onPress={handleLogout} />
          </>
        )}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    marginTop: 20,
    alignSelf: "center",
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
