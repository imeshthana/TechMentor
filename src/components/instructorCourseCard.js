import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { blue, purple } from "../utils/constants";

export const InstructorCourseCard = ({ title, description, count, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.courseTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.instructor}>No of Students Enrolled: {count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 3,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: purple,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  instructor: {
    fontSize: 13,
    color: "#888",
  },
});
