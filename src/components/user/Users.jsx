import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from "react-redux";
import { getuser, getusers } from "../../app/redux/feature/user/UserSlice";
import { addusers } from "../../app/redux/feature/user/AddUserSlice";
import { updateUsers } from "../../app/redux/feature/user/updateUserSlice";
import { deleteUsers } from "../../app/redux/feature/user/deleteUserSlice";
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
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const Users = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector(getuser);
  const [users, setUsers] = useState(
    { name: null, position: null, location: null, salary: null, _id: null }
  )
  console.log(userDetails, "userData");

  const onchangeHandle = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })
  }
  const handleClickOpen = (item) => {
    setOpen(true);
    setUsers(item)
  };
  const handleClose = () => {
    setOpen(false);
    setUsers({})
  };
  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

  const onSubmitData = (e) => {
    e.preventDefault()
    if (users?._id) {
      // for update user
      const promise = dispatch(updateUsers(users))
      promise.then((res) => {
        setOpen(false)
        window.location.reload()
      })
        .catch((err) => {
          setOpen(false)
          alert("try again")
        })
    } else {
      // for create user
      const promise = dispatch(addusers(users))
      promise.then((res) => {
        setOpen(false)
        window.location.reload()
      })
        .catch((err) => {
          setOpen(false)
          alert("try again")
        })
    }

    console.log(users, "2022");
  }
  const deleteUser = (id) => {
    const promise = dispatch(deleteUsers(id))
    promise.then((res) => {
      setOpen(false)
      console.log(res, "delte");
      window.location.reload()
    })
      .catch((err) => {
        setOpen(false)
        alert("try again")
      })
  }
  return (
    <div>
      <div className="">
        <h1 class="text-3xl font-bold  p-4 bg-red-100 text-center">
          User Details
        </h1>
        <div className="flex justify-end p-10">
          <Button variant="contained" className="captilize" onClick={() => setOpen(true)} >
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
                  {user && user.map((item, index) => {
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
                        <TableCell> <IconButton aria-label="delete" size="large" onClick={() => deleteUser(item._id)} >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                          <Button size="small" variant="outlined" onClick={() => handleClickOpen(item)}>Edit</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div>
        {/* edit dialog  */}
        <BootstrapDialog
          onClose={handleClose}
          sx={{ minWidth: 650 }}
          fullWidth
          maxWidth="xs"
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            User Details
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <form action="" onSubmit={onSubmitData} >
              <TextField id="outlined-basic" required margin="dense" value={users?.name} label="Name" name="name" variant="outlined" fullWidth onChange={onchangeHandle} />
              <TextField id="outlined-basic" required margin="dense" value={users?.position} label="postion" name="position" variant="outlined" fullWidth onChange={onchangeHandle} />
              <TextField id="outlined-basic" required margin="dense" value={users?.location} label="Location" name="location" variant="outlined" fullWidth onChange={onchangeHandle} />
              <TextField id="outlined-basic" required margin="dense" value={users?.salary} label="Salary" name="salary" variant="outlined" fullWidth onChange={onchangeHandle} />
              <div className="text-center my-5 rounded-full">
                <Button variant="contained" type="submit"  >Submit</Button>
              </div>
            </form>
          </DialogContent>

        </BootstrapDialog>
      </div>

    </div>
  );
};

export default Users;
