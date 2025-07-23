import React, { use, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { StudentCourseCard } from "../../components/studentCourseCard";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Title } from "../../components/title";
import { useFetchCourses } from "../../hooks/useCourseApi";
import { purple } from "../../utils/constants";

export const CoursesScreen = () => {
  const navigation = useNavigation();
  const [courseData, setCourseData] = useState();

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = (error) => {
    console.error("Error fetching courses:", error);
    Alert.alert("Error", "Failed to fetch courses. Please try again later.");
  };

  const handlePress = (course) => {
    navigation.navigate("SingleCourse", { course });
  };

  const { data, isLoading, isError } = useFetchCourses(
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (data) {
      setCourseData(data.courses);
    }
  }, [data]);

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"Courses"} />
        {isLoading || !courseData ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : (
          <FlatList
            data={courseData}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <StudentCourseCard
                title={item?.title}
                description={item?.description}
                instructor={item?.instructor_name}
                onPress={() => handlePress(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 16,
    paddingTop: 20,
  },
});
