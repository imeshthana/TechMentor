import { useQuery } from "@tanstack/react-query";
import { fetchInstructorCourses } from "../apis/instructorApis";

const useInstructorCourses = (userId, onSuccess, onError) => {
  return useQuery({
    queryKey: ["instructorCourses", userId],
    queryFn: fetchInstructorCourses,
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

export { useInstructorCourses };
