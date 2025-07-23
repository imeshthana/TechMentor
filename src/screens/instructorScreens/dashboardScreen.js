import React , {useContext, useState , useEffect }from "react";
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { InstructorCourseCard } from "../../components/instructorCourseCard";
import { Title } from "../../components/title";
import { AuthContext } from "../../contexts/authContext";
import { useInstructorCourses } from "../../hooks/useInstructorApi";
import { purple } from "../../utils/constants";

export const InstructorDashboardScreen = () => {
  const navigation = useNavigation();
  const { authData } = useContext(AuthContext);
  const [courseData, setCourseData] = useState();

  const handlePress = (item) => {
    navigation.navigate("SingleCourse", { course: item.course, enrolledStudents: item.enrolledStudents });
  };

  const handleSuccess = () => {
    console.log("Courses fetched successfully:");
  };

  const handleError = (error) => {
    console.error("Error fetching courses:", error);
    Alert.alert("Error", "Failed to fetch courses. Please try again later.");
  };

  const { data, isLoading, isError } = useInstructorCourses(
    authData?.userId,
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
        <Title title={"My Courses"} />
        {isLoading || !courseData ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color={purple} />
          </View>
        ) : (
          <FlatList
            data={courseData}
            keyExtractor={(item) => item.course.id}
            renderItem={({ item }) => (
              <InstructorCourseCard
                title={item.course.title}
                description={item.course.description}
                count={item.enrolledStudents?.length || 0}
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
  listContent: {
    paddingBottom: 16,
    paddingTop: 20,
  },
});
