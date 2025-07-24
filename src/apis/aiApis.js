import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const aiSuggestions = async (data) => {
  const res = await apiClient.post("/ai", data);
  console.log(res.data);
  return res.data;
};

export { aiSuggestions };
