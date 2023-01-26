import * as React from "react";
import {useToastAlert} from "../Util/toastAlert";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";

const FirstLogin = () => {
    const {
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});
    const [pwBool, setPwBool] = useState(false);
    const fCode = window.location.pathname.split('/').reverse()[0];

    useEffect(() => {
        axios.get(SERVER_URL + 'user/' + `first_login?fCode=${fCode}`)
            .then(res => {
                if(res.data.success === '1'){
                    setUserInfo(res.data.data);
                }
            })
    }, [])

    const changeInfo = (e) => {
        if(e.target.id === "user_pw_confirm"){
            if(e.target.value !== userInfo.user_pw){
                setPwBool(false);
            } else setPwBool(true);
            return;
        }
        let newUserInfo = {...userInfo};
        newUserInfo[e.target.id] = e.target.value;
        setUserInfo(newUserInfo);
    }

    const submitFirstLogin = () => {
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(userInfo.user_pw)){
            return toastNoticeWarning('비밀번호 규칙에 맞지 않는 비밀번호입니다.');
        }

        if(!pwBool){
            return toastNoticeWarning('비밀번호 확인이 다릅니다.');
        }

        if(!userInfo.user_phone.match(/^\d+$/)){
            return toastNoticeError('유효하지 않은 전화번호입니다.');
        }

        axios.post(SERVER_URL + 'user/first_login_confirm', userInfo)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess(res.data.msg);
                    navigate('/login');
                } else {
                    toastNoticeError(res.data.msg);
                }
            })

    }

    return (
        <div className="page">
            {
                userInfo.idx_user ?
                    <form>
                        <div className="file_upload_area">
                            <div className="head">
                                <button onClick={() => navigate('/login')}>
                                    <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                                </button>
                                <h2>회원 인증</h2>
                            </div>
                        </div>
                        <div className="profile_area">
                            <div className="profile_box">
                                <h3>안녕하세요. {userInfo.user_name}님, 가입을 축하드립니다.</h3>
                                <div className="input_box">
                                    <label htmlFor="user_phone">휴대폰 번호</label>
                                    <input onChange={(e) => changeInfo(e)} id="user_phone" type="tel" maxLength="11" placeholder="숫자만 입력해주세요."/>
                                </div>

                                <div className="input_box">
                                    <label htmlFor="user_pw">비밀번호 설정</label>
                                    <input onChange={(e) => changeInfo(e)} id="user_pw" type="password" placeholder="한글, 숫자, 영어, 특수기호 포함 8자 이상"/>
                                </div>
                                <div className="input_box">
                                    <label htmlFor="user_pw_confirm">비밀번호 확인</label>
                                    <input onChange={(e) => changeInfo(e)} id="user_pw_confirm" type="password" placeholder="비밀번호 확인"/>
                                </div>
                            </div>
                            <div className="btn_box">
                                <button onClick={submitFirstLogin} type="button">등록하기</button>
                            </div>
                        </div>
                    </form>
                    : "잘못된 접근입니다."
            }
        </div>
    )
}

export default FirstLogin;