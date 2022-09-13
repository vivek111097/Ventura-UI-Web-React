import axios from "axios";
import { CO_BaseURL } from "../../global/config";

// axios.defaults.headers.common['Accept']="application/json";
// axios.defaults.baseURL=CO_BaseURL;
// axios.defaults.headers.common['Authorization']="AUthorization Token Here";


const AxiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        Accept: `application/json`

    }
})


export default AxiosInstance;
