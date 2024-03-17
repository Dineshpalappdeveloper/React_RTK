import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUsers } from "../../app/redux/feature/user/registerUserSlice";

const Register = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const [users, setUsers] = useState({
        name: null,
        email: null, fullname: null
    })
    const onchangeHandle = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }
    const registerHandler = (e) => {
        e.preventDefault()
        const promise = dispatch(registerUsers(users))
        promise.then((res) => {
            alert(res?.payload?.message)
            nav("/login")
            console.log(res.payload.message, "2222");
        }).catch((err) => {
            console.log(err);
        })
    }
    return <div>

        <div className="text-center flex justify-center   ">

            <Paper sx={{ maxWidth: "700px", minWidth: "450px", padding: "10px" }} elevation={3} >
                <h1 className="font-size-8">
                    Welcome To Donocare
                </h1>
                <form onSubmit={registerHandler}>
                    <TextField id="outlined-basic" required margin="dense" value={users?.fullname} label="Full Name" fullWidth name="fullname" variant="outlined" onChange={onchangeHandle} />
                    <TextField id="outlined-basic" required margin="dense" value={users?.email} label="Email" fullWidth name="email" variant="outlined" onChange={onchangeHandle} />
                    <TextField id="outlined-basic" required margin="dense" value={users?.password} label="Password" fullWidth name="password" variant="outlined" onChange={onchangeHandle} />
                    <div className="text-center my-5 rounded-full">
                        <Button variant="contained" type="submit"  >Submit</Button>
                    </div>
                </form>
                <h1 className="bg-red-200">Already  have Account <span>
                    <NavLink to="/login" className="text-red-500 p-2">Login</NavLink>
                </span> </h1>

            </Paper>


        </div>
    </div>;
};

export default Register;
