import React, { useContext, useState, useEffect } from "react";
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
import { AuthContext } from "../../contexts/authContext";
import { useStudentCourses } from "../../hooks/useStudentApi";
import { purple } from "../../utils/constants";

export const StudentDashBoardScreen = () => {
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation();
  const [courseData, setCourseData] = useState();

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = () => {
    console.error("Error fetching courses:", error);
    Alert.alert("Error", "Failed to fetch courses. Please try again later.");
  };

  const { data, isLoading, isError } = useStudentCourses(
    authData?.userId,
    handleSuccess,
    handleError
  );

  useEffect(() => {
    if (data) {
      setCourseData(data.enrolledCourses);

      setCourseData((prevCourses) =>
        prevCourses.map((course) => ({
          ...course,
          isEnrolled: true,
        }))
      );
    }
  }, [data]);

  const handlePress = (course) => {
    navigation.navigate("SingleCourse", { course });
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView style={styles.container}>
        <Title title={"My Courses"} />
        {isLoading || !courseData ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : courseData.length === 0 ? (
          <View style={styles.centeredContainer}>
            <Text>No courses found</Text>
          </View>
        ) : (
          <FlatList
            data={courseData}
            keyExtractor={(item) => item._id}
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
