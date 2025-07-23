import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { StudentCourseCard } from "../../components/studentCourseCard";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../../components/title";

const courses = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
  },
  {
    id: "2",
    title: "Advanced Web Development",
    description: "Master frontend and backend development with modern tools.",
    instructor: "Jane Smith",
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Boost your problem-solving skills with DSA concepts.",
    instructor: "Emily Johnson",
  },
  {
    id: "4",
    title: "Introduction to Programming",
    description: "Learn the basics of programming using Python.",
    instructor: "John Doe",
  },
  {
    id: "5",
    title: "Advanced Web Development",
    description: "Master frontend and backend development with modern tools.",
    instructor: "Jane Smith",
  },
  {
    id: "6",
    title: "Data Structures & Algorithms",
    description: "Boost your problem-solving skills with DSA concepts.",
    instructor: "Emily Johnson",
  },
];

export const CoursesScreen = () => {
  const navigation = useNavigation();

  const handlePress = (course) => {
    navigation.navigate("SingleCourse", { course });
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"Courses"} />
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentCourseCard
              title={item.title}
              description={item.description}
              instructor={item.instructor}
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
    paddingTop: 20,
  },
});
