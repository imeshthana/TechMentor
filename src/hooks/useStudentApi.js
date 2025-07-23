import { useQuery } from "@tanstack/react-query";
import { fetchStudentCourses } from "../apis/studentApis";

const useStudentCourses = (userId, onSuccess, onError) => {
  return useQuery({
    queryKey: ["studentCourses", userId],
    queryFn: fetchStudentCourses,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.error("Error", error);
      onError(error);
    },
  });
};

export { useStudentCourses };
