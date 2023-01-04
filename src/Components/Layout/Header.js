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

    const logOut = () => {
        removeCookie('user_id'); // 쿠키를 삭제
        document.cookie = 'user_id' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.eura.site;path=/;'; //임시 도메인 날리기 (서버에서 보내주는 쿠키 삭제용)
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
                        <li className="deps select">
                            <button>Admin</button>
                            <ul className="deps2">
                                <li><NavLink to="/member_management">멤버 관리</NavLink></li>
                                <li><NavLink to="/usage_statistics">사용량 통계</NavLink></li>
                            </ul>
                        </li>
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