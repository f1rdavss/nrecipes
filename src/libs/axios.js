import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/recipes",
    headers: {
        "Content-Type": "application/json"
    }
})

export default axiosInstance