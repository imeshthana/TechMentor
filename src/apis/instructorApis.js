
import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const fetchInstructorCourses = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const res = await apiClient.get(`/instructor/courses/${userId}`);
  console.log(res.data);
  return res.data;
};

export { fetchInstructorCourses };
