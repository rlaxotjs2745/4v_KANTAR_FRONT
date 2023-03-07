import {Outlet} from "react-router-dom";
// import {useCookies} from "react-cookie";
import {useEffect} from "react";
import {getCookie, removeCookie} from "../Util/cookie";

const LayoutType3 = () => {
    // const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);

    const cookieName = getCookie("X-AUTH-TOKEN");

    useEffect(() => {
        removeCookie("X-AUTH-TOKEN");
    }, []);



    return (
        <div>
            <Outlet/>
        </div>
    )
}
export default LayoutType3;