import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { InstructorCourseCard } from "../../components/instructorCourseCard";
import { Title } from "../../components/title";

const courses = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    count: 2,
    contents: [
      "dewdew", 'ewxwe'
    ],
    students: [
      { id: "stu001", name: "Alice" },
      { id: "stu002", name: "Bob" },
    ],
  },
  {
    id: "2",
    title: "Advanced Web Development",
    description: "Master frontend and backend development with modern tools.",
    count: 2,
    students: [
      { id: "stu001", name: "Alice" },
      { id: "stu002", name: "Bob" },
    ],
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Boost your problem-solving skills with DSA concepts.",
    count: 2,
    students: [
      { id: "stu001", name: "Alice" },
      { id: "stu002", name: "Bob" },
    ],
  },
];

export const InstructorDashboardScreen = () => {
  const navigation = useNavigation();

  const handlePress = (course) => {
    navigation.navigate("SingleCourse", { course });
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"My Courses"} />
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InstructorCourseCard
              title={item.title}
              description={item.description}
              count={item.count}
              onPress={() => handlePress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
    paddingTop: 20
  },
});
