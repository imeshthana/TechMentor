import ApiClient from "../services/apiService";

const apiClient = ApiClient;

const fetchCourses = async () => {
  const res = await apiClient.get("/course/get");
  console.log(res.data);
  return res.data;
};

const fetchSingleCourse = async ({ queryKey }) => {
  const [_, courseId] = queryKey;
  const res = await apiClient.get(`/course/get/${courseId}`);
  console.log(res.data);
  return res.data;
};

const addCourse = async (data) => {
  const res = await apiClient.post("/course/add", data);
  console.log(res.data);
  return res.data;
};

const editCourse = async ({ courseId, data }) => {
  const res = await apiClient.put(`/course/edit/${courseId}`, data);
  console.log(res.data);
  return res.data;
};

const deleteCourse = async ({ courseId }) => {
  const res = await apiClient.delete(`/course/delete/${courseId}`);
  console.log(res.data);
  return res.data;
};

const enrollInCourse = async ({ courseId, userId }) => {
  const res = await apiClient.post(`/course/enroll/${courseId}`, {id: userId});
  console.log(res.data);
  return res.data;
};

export {
  fetchCourses,
  fetchSingleCourse,
  addCourse,
  deleteCourse,
  editCourse,
  enrollInCourse,
};
