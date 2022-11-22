const BASE_URL : string = "https://localhost:7280/api/";

interface UserLoginDto{
    email : string,
    password : string
}
export const login = async (data : UserLoginDto)=>{
    console.log(JSON.stringify(data));
    try {
        const response = await fetch(BASE_URL + "login", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        const responseData = await response.json();
        console.log(responseData);
        return responseData;

    } catch (error:any) {
        throw error;
    }
};

export const logout = async() =>{
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    console.log("sjklds");
}