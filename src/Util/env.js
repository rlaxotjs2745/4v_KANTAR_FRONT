
import {getCookie} from "./cookie";


// export const SERVER_URL = "http://192.168.0.13:10000/api/project/"
// export const SERVER_URL = "http://localhost:10000/api/project/"
export const SERVER_URL = "https://2735-121-165-116-213.jp.ngrok.io/api/project/";

const userid = getCookie('user_id')

export const AXIOS_OPTION = {
    withCredentials:true
};

// export const COOKIE_DOMAIN = "http://192.168.0.13:10000/api/project/";
// export const COOKIE_DOMAIN = "http://localhost:10000/api/project/";
