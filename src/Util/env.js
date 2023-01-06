
import {getCookie} from "./cookie";


export const SERVER_URL = "http://43.200.7.62:10000/api/project/"
// export const SERVER_URL = "http://localhost:10000"

const userid = getCookie('user_id')

export const AXIOS_OPTION = {
    withCredentials:true
};

export const COOKIE_DOMAIN = "http://43.200.7.62:10000/api/project/";
// export const COOKIE_DOMAIN = "localhost";