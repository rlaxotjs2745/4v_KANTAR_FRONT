
import {getCookie} from "./cookie";
import axios, { AxiosRequestConfig } from 'axios';


// export const SERVER_URL = "http://192.168.0.13:10000/api/project/"
// export const SERVER_URL = "http://swdev2.dynu.net:3000/api"
// export const SERVER_URL = "http://localhost:10000/api/";

export const SERVER_URL = "http://192.168.0.16:10000/api/";
// export const SERVER_URL = "https://477a-211-221-71-139.jp.ngrok.io/api/";

const userid = getCookie('user_id')

export const headers = {
    'X-AUTH-TOKEN': getCookie('X-AUTH-TOKEN')
}

export const AXIOS_OPTION = Object.assign({}, {
    withCredentials: true,
    headers: headers
})

// export const AXIOS_OPTION = {...{
//         withCredentials: true,
//         headers: headers
//     }}

// export const COOKIE_DOMAIN = "http://192.168.0.13:10000/api/project/";
// export const COOKIE_DOMAIN = "http://localhost:10000/api/project/";
