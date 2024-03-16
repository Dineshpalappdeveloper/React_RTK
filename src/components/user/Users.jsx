import { Button } from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { getuser, getusers } from "../../app/redux/feature/user/UserSlice";
const user = [
  {
    key: 0,
    label: "Name",
  },
  {
    key: 1,
    label: "Position",
  },
  {
    key: 2,
    label: "Location",
  },
  {
    key: 3,
    label: "Salary",
  },
  {
    key: 4,
    label: "Uniqe Id",
  },
  {
    key: 5,
    label: "Action",
  },
];
const Users = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(getuser);
  console.log(userDetails, "userData");
  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);
  return (
    <div>
      <div className="">
        <h1 class="text-3xl font-bold  p-4 bg-red-100 text-center">
          User Details
        </h1>
        <div className="flex justify-end p-10">
          <Button variant="contained" className="captilize">
            Add User
          </Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              className="text-center"
            >
              <TableHead>
                <TableRow>
                  {user.map((item, index) => {
                    return <TableCell key={index}>{item.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {userDetails?.userData &&
                  userDetails?.userData.map((item, index) => {
                    return (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        key={index}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.position}</TableCell>
                        <TableCell>{item.location}</TableCell>

                        <TableCell>{item.salary}</TableCell>
                        <TableCell>{item._id}</TableCell>
                        <TableCell> <IconButton aria-label="delete" size="large">
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                          <Button size="small" variant="outlined">Edit</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Users;
