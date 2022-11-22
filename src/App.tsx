import React, {useEffect, useState} from 'react';
import './App.css';
import ResponsiveAppBar from "./components/responsiveAppBar/ResponsiveAppBar";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Teachers from "./pages/Teachers";
import Homepage from "./pages/Homepage";
import ClientLessons from "./pages/ClientLessons";
import Clients from "./components/Clients";
import Calendar from "./pages/calendar/Calendar";
import {createContext} from "react";
import Login from "./pages/Login";
import LoginIcon from "./pages/Login";
import TeacherAdmin from "./pages/TeacherAdmin";

interface userAuthProps{
    isAuth : boolean,
    setIsAuth : React.Dispatch<React.SetStateAction<boolean>>,
    token : string,
    setToken : React.Dispatch<React.SetStateAction<string>>
};

export const AuthContext = createContext({} as userAuthProps);

function App() {
        const [isAuth, setIsAuth] = useState<boolean>(false);
        const [token, setToken] = useState<string>("");

        useEffect(() => {
            if (localStorage.getItem('id') && localStorage.getItem('token')){
                setIsAuth(true);
                const accessToken = localStorage.getItem('token');
                setToken(accessToken !== null ? accessToken : "-1");
            }
            else{
                console.log("unAuth");
            }
        }, [isAuth])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            token,
            setToken
        }}>
    <div className="App">
        <BrowserRouter>
            <ResponsiveAppBar/>
            <Routes>
                <Route path="/" element={<Homepage/>}/>

                <Route path='/teachers' element={<Teachers/>}></Route>

                <Route path="/calendar" element={<Calendar/>}/>

                <Route path='/login' element={<LoginIcon/>}/>

                <Route path='/clientLessons' element={<ClientLessons/>}/>

                <Route path='/teacherPanel' element={<TeacherAdmin/>}/>

            </Routes>
        </BrowserRouter>
    </div>
            </AuthContext.Provider>
  );
}

export default App;