import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../../Util/env";
import {useCookies} from "react-cookie";
import {useToastAlert} from "../../Util/toastAlert";
import {getCookie} from "../../Util/cookie";

export default function ScrollToTop() {
    const {
        toastNoticeWarning,
    } = useToastAlert();
    const {pathname} = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);
    const navigate = useNavigate();
    const logOut = () => {
        removeCookie("X-AUTH-TOKEN", {path: "/", domain: window.location.hostname}) // path랑 domain 입력 해야
        navigate('/login'); // 로그인 페이지로 이동
        // window.location.reload();
    };

    useEffect(() => {
        if(!pathname.includes('firstlogin')) {
            window.scrollTo(0, 0);
            const token = getCookie('X-AUTH-TOKEN');
            if (token) {
                // console.log('토큰이 있을때만 실행')
                axios.get(SERVER_URL + 'user/loginchk', AXIOS_OPTION).then(res => {
                    if(res.data.success === '0'){
                        console.log('여기 실행중')
                        toastNoticeWarning('토큰이 만료되어 로그아웃됩니다. 다시 로그인해주세요.')
                        logOut()
                    } else {
                        console.log('로그인 유지중입니다')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }

    }, [pathname]);


    return null;
};