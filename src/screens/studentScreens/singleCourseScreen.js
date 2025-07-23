import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { useNavigation } from "@react-navigation/native";

export const SingleCourseScreen = () => {
  const route = useRoute();
  const { course } = route.params;

  const navigation = useNavigation();
  const parentNavigation = navigation.getParent();

  useEffect(() => {
    parentNavigation?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });

    return () => {
      parentNavigation?.setOptions({
        tabBarStyle: {
          display: "flex",
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ddd",
        },
      });
    };
  }, []);

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>Instructor: {course.instructor_name}</Text>
        <Text style={styles.description}>{course.description}</Text>

        {course.content && (
          <>
            <Text style={styles.sectionTitle}>Course Content:</Text>
            <FlatList
              data={course.content}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.contentItem}>
                  <Text style={styles.contentText}>{item}</Text>
                </View>
              )}
            />
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
    paddingTop: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  instructor: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#6a11cb",
  },
  contentItem: {
    paddingVertical: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  contentText: {
    fontSize: 16,
    color: "#222",
  },
});
