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
const userApi = {
  getusers,
};
export default userApi;
