import React, {useEffect} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { BackgroundWrapper } from "../components/backgroundWrapper";
import { useNavigation } from "@react-navigation/native";

export const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Landing");
    }, 3000);

  }, [navigation]);

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.fromText}>FROM</Text>
        <Text style={styles.brandText}>TechMentor</Text>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    
  },
  logo: {
    width: 150,
    height: 150,
  },
  bottomTextContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  fromText: {
    fontSize: 14,
    color: "#888",
    bottom: 20,
  },
  brandText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    bottom: 20,
  },
});
