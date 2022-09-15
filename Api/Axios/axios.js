import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: process.env.baseUrl,
    headers: {
        Accept: `application/json`,
    }    
})


export default AxiosInstance;
