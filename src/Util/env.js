
import {getCookie} from "./cookie";
import axios, { AxiosRequestConfig } from 'axios';

export const SERVER_URL = "http://localhost:10000/api/";

export const AXIOS_OPTION = ({
    withCredentials: false,
})


// axios.interceptors.request.use(
//     (config) => {
//         config.headers['X-AUTH-TOKEN'] = getCookie('X-AUTH-TOKEN');
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
axios.defaults.headers.common = {};
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(
    config => {
        const token = getCookie('X-AUTH-TOKEN');
        if (token) {
            config.headers['X-AUTH-TOKEN'] = token;
        }
        return config;
    },
    error => Promise.reject(error)
);




