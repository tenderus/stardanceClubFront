import React, {useContext, useState} from 'react';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {AuthContext} from '../App';
import {yupResolver} from '@hookform/resolvers/yup';
import {login} from "../services/UserService";
import Tooltip from "@mui/material/Tooltip";
import {useLogin} from "../hooks/useLogin";
import "./login.css"

const LoginIcon = () => {
    const [open, setOpen] = React.useState(false);

    // @ts-ignore
    const {isAuth, setIsAuth, setToken} = useContext(AuthContext);

    const schema = yup.object().shape({
        email : yup.string().max(100).required(),
        password : yup.string().required()
    })
    const {register, handleSubmit, errors} : any = useForm({resolver:yupResolver(schema)})

    const [onSubmitHandler] = useLogin(setIsAuth, setToken, setOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div style={{fontFamily: 'Montserrat'}}>
            <Tooltip title="Login">
                <IconButton
                    onClick={handleClickOpen}
                    sx={{color : 'white'}}>
                    <AccountCircleIcon fontSize="large"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent sx={{mt : 2}}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <div>
                            <TextField
                                variant="filled"
                                helperText="Please enter your email"
                                label="Email"
                                type="email"
                                fullWidth
                                {...register("email")}
                            />
                        </div>
                        <div>
                            <TextField
                                variant="filled"
                                helperText="Please enter your password"
                                label="Password"
                                type="password"
                                fullWidth
                                {...register("password")}
                            />
                        </div>
                        <DialogContentText sx={{mt : 2}}>
                            Don't have account? Register now!
                        </DialogContentText>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Login</Button>

                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginIcon;