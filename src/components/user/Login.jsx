import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { NavLink, useNavigate } from "react-router-dom";
import { loginUsers } from "../../app/redux/feature/user/loginUserSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const [users, setUsers] = useState({
    name: null,
    email: null
  })
  useEffect(() => {
    let token = localStorage.getItem("user")
    if (token) {
      nav("/dashboard")

    }
  }, [nav])
  const onchangeHandle = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }
  const loginHandler = (e) => {

    e.preventDefault()
    const promise = dispatch(loginUsers(users))
    promise.then((res) => {
      localStorage.removeItem("user")
      localStorage.setItem("user", res?.payload?.jwttoken)
      nav("/dashboard")
    }).catch((err) => {
      console.log(err);
    })

  }
  return <div>

    <div className="text-center flex justify-center   ">

      <Paper sx={{ maxWidth: "700px", minWidth: "450px", padding: "10px" }} elevation={3} >
        <h1 className="font-size-8">
          Welcome Again
        </h1>
        <form onSubmit={loginHandler}>
          <TextField id="outlined-basic" required margin="dense" value={users?.email} label="Email" fullWidth name="email" variant="outlined" onChange={onchangeHandle} />
          <TextField id="outlined-basic" required margin="dense" value={users?.password} label="Password" fullWidth name="password" variant="outlined" onChange={onchangeHandle} />
          <div className="text-center my-5 rounded-full">
            <Button variant="contained" type="submit"  >Submit</Button>
          </div>
        </form>
        <h1 className="bg-red-200">Don't have Account <span>
          <NavLink to="/register" className="text-red-500 p-2">Register Now</NavLink>
        </span> </h1>

      </Paper>


    </div>
  </div>;
};

export default Login;
