import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCourses,
  fetchSingleCourse,
  addCourse,
  editCourse,
  deleteCourse,
  enrollInCourse,
} from "../apis/courseApis";

const useFetchCourses = (onSuccess, onError) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

const useFetchSingleCourse = (courseId, onSuccess, onError) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: fetchSingleCourse,
    enabled: !!courseId,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

const useAddCourse = (onSuccess, onError) => {
  return useMutation({
    mutationFn: addCourse,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

const useEditCourse = (onSuccess, onError) => {
  return useMutation({
    mutationFn: editCourse,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

const useDeleteCourse = (onSuccess, onError) => {
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

const useEnrollInCourse = (onSuccess, onError) => {
  return useMutation({
    mutationFn: enrollInCourse,
    onSuccess: (data) => {
      console.log("Success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("Error", error);
      onError(error);
    },
  });
};

export {
  useFetchCourses,
  useFetchSingleCourse,
  useAddCourse,
  useEditCourse,
  useDeleteCourse,
  useEnrollInCourse,
};
