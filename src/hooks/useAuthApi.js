import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProfile, register, signIn } from "../apis/authApis";

const useSignIn = (onSuccess, onError) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log("success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("error", error);
      onError(error);
    },
  });
};

const useRegister = (onSuccess, onError) => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("error", error);
      onError(error);
    },
  });
};

const useProfile = (userId, onSuccess, onError) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: fetchProfile,
    onSuccess: (data) => {
      console.log("success", data);
      onSuccess(data);
    },
    onError: (error) => {
      console.log("error", error);
      onError(error);
    },
  });
};

export { useSignIn, useRegister, useProfile };
