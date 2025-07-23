import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { purple } from "../../utils/constants";

export const SingleCourseScreen = () => {
  const route = useRoute();
  const { course } = route.params;
  const navigation = useNavigation();
  const parentNavigation = navigation.getParent();

  const gotoEditCourse = () => {
    navigation.navigate("EditCourse", { course });
  };

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
        <Text style={styles.description}>{course.description}</Text>

        {course.students && course.students.length > 0 && (
          <View style={styles.tableContainer}>
            <Text style={styles.sectionTitle}>Enrolled Students</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.headerCell]}>ID</Text>
              <Text style={[styles.cell, styles.headerCell]}>Name</Text>
            </View>
            {course.students.map((student) => (
              <View key={student.id} style={styles.tableRow}>
                <Text style={styles.cell}>{student.id}</Text>
                <Text style={styles.cell}>{student.name}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.fab} onPress={gotoEditCourse}>
          <Ionicons name="create-outline" size={28} color="#fff" />
        </TouchableOpacity>
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
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    color: purple,
  },
  tableContainer: {
    marginTop: 10,
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  headerCell: {
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: purple,
    borderRadius: 50,
    padding: 14,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
