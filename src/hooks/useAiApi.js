import { useMutation, useQuery } from "@tanstack/react-query";
import { aiSuggestions } from "../apis/aiApis";

const useAiSuggestions = (onSuccess, onError) => {
  return useMutation({
    mutationFn: aiSuggestions,
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

export { useAiSuggestions };
