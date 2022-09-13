import axios from "axios";
import { CO_BaseURL } from "../../global/config";

// axios.defaults.headers.common['Accept']="application/json";
// axios.defaults.baseURL=CO_BaseURL;
// axios.defaults.headers.common['Authorization']="AUthorization Token Here";


const AxiosInstance = axios.create({
    baseURL: CO_BaseURL,
    headers: {
        Accept: `application/json`,
        session_id:"82275b0c-9f2c-4c7b-9dc0-1972f4f55064"

    }
})


export default AxiosInstance;