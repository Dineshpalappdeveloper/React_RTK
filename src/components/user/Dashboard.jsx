import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllusers,
  getalluser,
} from "../../app/redux/feature/user/getAlluserSlice";

const Dashboard = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(getalluser);
  useEffect(() => {
    let token = localStorage.getItem("user");
    if (!token) {
      nav("/login");
    } else {
      dispatch(getAllusers(token));
    }
  }, [dispatch, nav]);
  console.log(userDetails, "5525");
  return (
    <div>
      <h1>Dashboard</h1>
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {userDetails?.userData &&
            userDetails?.userData?.data?.map((item, index) => {
              return (
                <tr key={index} className="text-center">
                  <td>{item?.fullname}</td>
                  <td>{item?.email}</td>
                  <td>{item?.createdAt}</td>
                  <td>{item?._id}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
