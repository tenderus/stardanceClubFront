import {SetStateAction, useState} from "react";
import {login} from "../services/UserService";
import {redirect, useNavigate} from "react-router-dom";

export const useLogin = (setIsAuth: (arg0: boolean) => void, setToken: (arg0: any) => void, setOpen: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) : [(data: any) => Promise<void>, boolean, string] => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    let navigate = useNavigate();

    const onSubmitHandler = async (data: any) => {
        setErrorMessage("");
        try{
            setIsLoading(true);
            const response = await login(data);
            if (response.message){
                setErrorMessage(response.message);
            }
            else{
                localStorage.setItem('id', response.id);
                localStorage.setItem('role', response.role);
                localStorage.setItem('token', response.accessToken);
                console.log(response.role);
                setIsAuth(true);
                setToken(response.accessToken);
                setOpen(false);
                const routeChange = () =>{
                    if(localStorage.getItem('role') === 'teacher') {
                        navigate('/teacherPanel')
                    }
                    else navigate('/calendar')
                };
                routeChange();
            }
        }
        catch(e : any){
            setErrorMessage("Smth bad with request");
        }
        finally{
            setIsLoading(false);
        }

    }
    return [onSubmitHandler, isLoading, errorMessage];
};