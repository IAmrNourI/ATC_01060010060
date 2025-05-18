import { axiosInstance } from "./index";

const registerApi = async(data) => {
    return await axiosInstance.post("/api/auth/register", data)
}

const LoginApi = async (data) => {
    return await axiosInstance.post("/api/auth/login", data, {
        withCredentials: true
    });
}

const isLoggedIn = async () => {
    const token = localStorage.getItem('token'); 
    return await axiosInstance.get('/api/auth/is-logged-in', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}


export { registerApi, LoginApi, isLoggedIn }