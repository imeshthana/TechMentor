import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const signIn = async (data) => {
  const res = await apiClient.post("/auth/signin", data);
  console.log(res.data);
  return res.data;
};

const register = async (data) => {
  const res = await apiClient.post("/auth/register", data);
  console.log(res.data);
  return res.data;
};

const fetchProfile = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const res = await apiClient.get(`/auth/profile/${userId}`);
  console.log(res.data);
  return res.data;
};

export { signIn, register, fetchProfile };
