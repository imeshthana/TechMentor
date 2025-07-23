import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const fetchInstructureCourses = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const res = await apiClient.get(`/student/courses/${userId}`);
  console.log(res.data);
  return res.data;
};

export { fetchInstructureCourses };
