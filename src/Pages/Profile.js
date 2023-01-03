import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { AXIOS_OPTION, SERVER_URL } from "../Util/env";
import $ from "jquery";

const Profile = () => {
    const [passwordTypes, setPasswordTypes] = useState({
        'origin_pw': { type: 'password', visible: false },
        'new_pw': { type: 'password', visible: false },
        'new_pw_chk': { type: 'password', visible: false }
    });

    const handlePasswordType = inputId => {
        setPasswordTypes(prevState => {
            const updatedPasswordTypes = { ...prevState };
            updatedPasswordTypes[inputId] = {
                ...prevState[inputId],
                type: prevState[inputId].type === 'password' ? 'text' : 'password',
                visible: !prevState[inputId].visible
            };
            return updatedPasswordTypes;
        });
    };

    const navigate = useNavigate();

    return (
        <div className="page">
            <form>
                <div className="profile_area">
                    <div className="profile_box">
                        <h3>김설문</h3>
                        <p className="user_id">seolmoon@kantar.com</p>
                    </div>
                    <div className="profile_box">
                        <h3>멤버 정보</h3>
                        <div className="input_box">
                            <label htmlFor="user_id">이름</label>
                            <input id="user_id" type="text" defaultValue="김설문"/>
                        </div>
                        <div className="input_box">
                            <label htmlFor="user_tel">전화번호</label>
                            <input id="user_tel" type="tel" defaultValue="(+82) 10-4567-0987"/>
                        </div>
                    </div>
                    <div className="profile_box">
                        <h3>비밀번호 변경</h3>
                        <div className="input_box">
                            <label htmlFor="origin_pw">현재 비밀번호</label>
                            <div className="input_btn">
                                <input id="origin_pw" type={passwordTypes['origin_pw'].type} />
                                <button type="button" onClick={() => handlePasswordType('origin_pw')}>
                                    {passwordTypes['origin_pw'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="input_box">
                            <label htmlFor="new_pw">새로운 비밀번호</label>
                            <div className="input_btn">
                                <input id="new_pw" type={passwordTypes['new_pw'].type} />
                                <button type="button" onClick={() => handlePasswordType('new_pw')}>
                                    {passwordTypes['new_pw'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                            <p className="tip">한글, 숫자, 영어, 특수기호 포함 8~12글자</p>
                        </div>
                        <div className="input_box">
                            <label htmlFor="new_pw_chk">새로운 비밀번호 확인</label>
                            <div className="input_btn">
                                <input id="new_pw_chk" type={passwordTypes['new_pw_chk'].type} />
                                <button type="button" onClick={() => handlePasswordType('new_pw_chk')}>
                                    {passwordTypes['new_pw_chk'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="btn_box">
                        <button type="button">저장하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile;