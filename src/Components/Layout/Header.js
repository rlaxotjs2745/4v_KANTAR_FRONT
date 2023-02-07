import React, {useEffect, useState} from "react";
import {Link, Navigate, NavLink} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../../Util/env";

const Header = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);
    const navigate = useNavigate();
    const [role, setRole] = useState(1);

    useEffect(() => {
        getListMember()
    }, [])

    const getListMember = () => {
        axios.get(SERVER_URL + 'user/header_info', AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    setRole(res.data.data.user_type);
                }
            })
    }

    const logOut = () => {
        removeCookie("X-AUTH-TOKEN", {path: "/", domain: window.location.hostname}) // path랑 domain 입력 해야
        navigate('/login'); // 로그인 페이지로 이동
    };

    function get_cookie(name) {
        let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    return (

        <>
            <header className="header">
                <div className="left">
                    <h1><Link to="/">KANTAR <b>[Studio]</b></Link></h1>
                    <ul className="gnb">
                        {/*<li className="deps"><NavLink to="/" className={({ isActive }) => (isActive ? 'on' : '')}>Project</NavLink></li>*/}
                        <li className="deps"><NavLink to="/">Project</NavLink></li>
                        <li className="deps"><NavLink to="/report">Report</NavLink></li>
                        <li className="deps"><NavLink to="/dictionary">Dictionary</NavLink></li>
                        {
                            role !== 1 ?
                            <li className="deps select">
                                <button>Admin</button>
                                <ul className="deps2">
                                    <li><NavLink to="/member_management">멤버 관리</NavLink></li>
                                    <li><NavLink to="/usage_statistics">사용량 통계</NavLink></li>
                                </ul>
                            </li> : null
                        }
                    </ul>
                </div>
                <div className="user_box select">
                    <button ><img src={process.env.PUBLIC_URL + '/assets/image/ico_profile.svg'}/></button>
                    <ul className="deps2">
                       <li><Link to="/profile">계정관리</Link></li>
                       <li><button onClick={logOut}>로그아웃</button></li>
                    </ul>
                </div>
            </header>
        </>

    )
}

export default Header;