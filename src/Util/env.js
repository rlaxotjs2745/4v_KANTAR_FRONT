
import {getCookie} from "./cookie";
import axios  from 'axios';

export const SERVER_URL = "http://13.125.43.62:10000/api/";
export const WS_URL = "ws://15.165.18.70:8000";

export const AXIOS_OPTION = ({
    withCredentials: false,
})


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




