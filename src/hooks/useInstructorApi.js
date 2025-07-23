import { useQuery } from "@tanstack/react-query";
import { fetchInstructureCourses } from "../apis/instructureApis";

const useInstructureCourses = (userId, onSuccess, onError) => {
  return useQuery({
    queryKey: ["instructureCourses", userId],
    queryFn: fetchInstructureCourses,
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

export { useInstructureCourses };
