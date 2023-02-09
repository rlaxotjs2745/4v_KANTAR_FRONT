import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../../Util/env";
import {useCookies} from "react-cookie";

export default function ScrollToTop() {
    const {pathname} = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);
    const navigate = useNavigate();
    const logOut = () => {
        removeCookie("X-AUTH-TOKEN", {path: "/", domain: window.location.hostname}) // path랑 domain 입력 해야
        navigate('/login'); // 로그인 페이지로 이동
        window.location.reload();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(SERVER_URL + 'user/loginchk', AXIOS_OPTION).then(res => {
            if(res.data.success === '0'){
                logOut()
            } else {
                console.log('로그인 유지중입니다')
            }
        }).catch(err => {
            console.log(err);
        })
    }, [pathname]);


    return null;
};