import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { InputField } from "../../components/inputField";
import { PrimaryButton } from "../../components/primaryButton";
import { Title } from "../../components/title";
import { BackgroundWrapper } from "../../components/backgroundWrapper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { blue, purple } from "../../utils/constants";
import { useDeleteCourse, useEditCourse } from "../../hooks/useCourseApi";

export const EditCourseScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { course } = params;

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [courseContentList, setCourseContentList] = useState(
    course.content || []
  );
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    content: "",
  });

  const validateFields = () => {
    const newErrors = {
      title: "",
      description: "",
      content: "",
    };

    if (!title.trim()) newErrors.title = "Course title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (courseContentList.every((item) => item.trim() === ""))
      newErrors.content = "At least one content block is required";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleUpdateSuccess = () => {
    Alert.alert("Success", "Course updated successfully");
    handleNavigation();
  };

  const handleNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "InstructorBottomTab",
          state: {
            index: 0,
            routes: [{ name: "Dashboard" }],
          },
        },
      ],
    });
  }

  const handleUpdateError = () => {
    Alert.alert("Error", "Failed to update course");
  };

  const handleDeleteSuccess = () => {
    Alert.alert("Deleted", "Course has been deleted");
    handleNavigation();
  };

  const handleDeleteError = () => {
    Alert.alert("Error", "Failed to delete course");
  };

  const { mutate: updateCourse, status: updateStatus } = useEditCourse(
    handleUpdateSuccess,
    handleUpdateError
  );

  const { mutate: deleteCourse, status: deleteStatus } = useDeleteCourse(
    handleDeleteSuccess,
    handleDeleteError
  );

  const handleSubmit = () => {
    if (validateFields()) {
      const filteredContent = courseContentList.filter(
        (item) => item.trim() !== ""
      );
      updateCourse({
        courseId: course.id,
        data: {
          title,
          description,
          content: filteredContent,
        },
      });
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Course",
      "Are you sure you want to delete this course?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCourse({ courseId: course.id });
          },
        },
      ]
    );
  };

  const handleAddBlock = () => setCourseContentList([...courseContentList, ""]);

  const handleRemoveBlock = (index) => {
    const newList = [...courseContentList];
    newList.splice(index, 1);
    setCourseContentList(newList);
  };

  const handleChangeBlock = (text, index) => {
    const newList = [...courseContentList];
    newList[index] = text;
    setCourseContentList(newList);
  };

  return (
    <BackgroundWrapper>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Title title="Edit Course" />

          <View style={styles.formContainer}>
            <InputField
              placeholder="Course Title"
              value={title}
              onChangeText={setTitle}
              hasError={!!errors.title}
            />
            {errors.title ? (
              <Text style={styles.errorText}>{errors.title}</Text>
            ) : null}

            <InputField
              placeholder="Course Description"
              value={description}
              onChangeText={setDescription}
              hasError={!!errors.description}
            />
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : null}

            <Text style={styles.subHeading}>Course Content</Text>
            {errors.content ? (
              <Text style={styles.errorText}>{errors.content}</Text>
            ) : null}

            {courseContentList.map((content, index) => (
              <View key={index} style={styles.contentBlock}>
                <TextInput
                  style={styles.input}
                  placeholder={`Content Block ${index + 1}`}
                  value={content}
                  onChangeText={(text) => handleChangeBlock(text, index)}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveBlock(index)}
                  style={styles.icon}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={26}
                    color={purple}
                  />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity onPress={handleAddBlock} style={styles.addBlock}>
              <Ionicons name="add-circle-outline" size={24} color={purple} />
              <Text style={styles.addBlockText}>Add Content Block</Text>
            </TouchableOpacity>
          </View>

          {deleteStatus === "loading" || updateStatus === "loading" ? (
            <ActivityIndicator size="large" color={purple} />
          ) : (
            <>
              <PrimaryButton
                title="Delete Course"
                onPress={handleDelete}
                backgroundColor={blue}
              />
              <PrimaryButton title="Save Changes" onPress={handleSubmit} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  formContainer: {
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    height: 50,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  contentBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    marginLeft: 5,
    marginTop: -5,
  },
  addBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addBlockText: {
    marginLeft: 6,
    fontSize: 16,
    color: purple,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});
