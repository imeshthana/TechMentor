import React, { use, useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../contexts/authContext";
import { useStudentCourses } from "../../hooks/useStudentApi";

export const CoursesScreen = () => {
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [courseData, setCourseData] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courses, setCourses] = useState();

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = (error) => {
    console.error("Error fetching courses:", error);
    Alert.alert("Error", "Failed to fetch courses. Please try again later.");
  };

  const handlePress = (course) => {
    navigation.navigate("SingleCourse", { course });
    console.log(courses);
  };

  const { data, isLoading, isError } = useFetchCourses(
    handleSuccess,
    handleError
  );

  const {
    data: enrolledData,
    isLoading: isEnrolledLoading,
    isError: isEnrolledError,
  } = useStudentCourses(authData?.userId, handleSuccess, handleError);

  useEffect(() => {
    if (data && enrolledData) {
      setCourseData(data.courses);
      setEnrolledCourses(enrolledData.enrolledCourses);

      const enrolledCourseIds = enrolledData.enrolledCourses.map(
        (course) => course._id
      );
      console.log(enrolledCourseIds);

      const updatedCourses = data.courses.map((course) => ({
        ...course,
        isEnrolled: enrolledCourseIds.includes(course.id),
      }));

      setCourses(updatedCourses);
    }
  }, [data, enrolledData]);

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"Courses"} />
        {isLoading || !courses || isEnrolledLoading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : (
          <FlatList
            data={courses}
            keyExtractor={(item) => item?.id}
            renderItem={({ item }) => (
              <StudentCourseCard
                title={item?.title}
                description={item?.description}
                instructor={item?.instructor_name}
                onPress={() => handlePress(item)}
                isEnrolled={item?.isEnrolled}
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
