import axios from "axios";
import { CO_BaseURL } from "../../global/config";



const AxiosInstance = axios.create({
    baseURL: CO_BaseURL,
    headers: {
        Accept: `application/json`,
    }    
})


export default AxiosInstance;
