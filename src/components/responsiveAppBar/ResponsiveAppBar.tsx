import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "../../context/ThemeContext";
import LoginIcon from "../../pages/Login";
import {logout} from "../../services/UserService"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./responsiveAppBar.css";
import {render} from "react-dom";
import {AuthContext} from "../../App";


const pages =[ { text: 'Home', href: '/' },
    { text: 'Our teachers', href: '/teachers'},
]



function ResponsiveAppBar() {
    const [roleCheck, setRoleCheck] = useState<null | string>('');
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const theme = useContext(ThemeContext);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const submitLogout = async () => {
        await logout();
        setIsAuth(false);
    }

    useEffect(() => {
        setRoleCheck(localStorage.getItem('role'))
    }, [isAuth])


        return (
            <AppBar position="static" style={{backgroundColor: "#ff9999", height: "100px", alignItems: "center"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontSize: '3em',
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                                marginRight: '20px',
                            }}
                        >
                            <p>STARDANCE</p>
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.href} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                ))}
                                <MenuItem>Войти</MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: theme.primary.text,

                            }}
                        >
                            <p>STARDANCE</p>
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.href}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'inline'}}
                                    style={{fontSize: "20px", color: "white"}}
                                >
                                    <Link to={page.href}>{page.text}</Link>
                                </MenuItem>
                            ))}
                            {!isAuth ?
                                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                    <MenuItem  style={{fontSize: "20px"}}>
                                        <LoginIcon/>
                                    </MenuItem>
                                </Box> :
                                roleCheck === "client"  ?
                                <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                    <MenuItem style={{fontSize: "20px"}}><Link to={"/clientLessons"}>My lessons</Link></MenuItem>
                                    <MenuItem style={{fontSize: "20px"}}><Link to={"/calendar"}>Calendar</Link></MenuItem>
                                    <MenuItem style={{fontSize: "20px"}} onClick={submitLogout}><Link to={"/"}>Logout</Link></MenuItem>
                                </Box> :
                                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                        <MenuItem style={{fontSize: "20px"}}><Link to={"/teacherPanel"}>My lessons</Link></MenuItem>
                                        <MenuItem style={{fontSize: "20px"}} onClick={submitLogout}><Link to={"/"}>Logout</Link></MenuItem>
                                    </Box>
                            }
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
        );
}
export default ResponsiveAppBar;
