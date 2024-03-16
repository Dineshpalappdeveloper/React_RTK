import axios from "axios";

const getusers = async () => {
  try {
    const response = await axios.get(
      `https://crud-app-blue-nine.vercel.app/api/employee`
    );

    return response.data;
  } catch (e) {
    console.log(" getting Error: ", e);
  }
};
const addUsersApi = async (body) => {
  try {
    const response = await axios.post(
      `https://crud-app-blue-nine.vercel.app/api/employee`,
      body
    );
    return response.data;
  } catch (error) {
    console.log(" getting Error: ", error);
  }
};
const updateUserApi = async (id, body) => {
  try {
    const response = await axios.put(
      `https://crud-app-blue-nine.vercel.app/api/employee/${id}`,
      body
    );
    return response.data;
  } catch (error) {
    console.log(" getting Error: ", error);
  }
};
const deleteUserApi = async (id) => {
  try {
    const response = await axios.delete(
      `https://crud-app-blue-nine.vercel.app/api/employee/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(" getting Error: ", error);
  }
};
const userApi = {
  getusers,
  addUsersApi,
  updateUserApi,
  deleteUserApi,
};
export default userApi;
