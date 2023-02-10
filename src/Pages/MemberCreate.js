import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const MemberCreate = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
    } = useToastAlert();
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({});
    const [isSuper, setIsSuper] = useState(false);
    const idx_user = 1;
    let isDoing = false;


    useEffect(() => {
        axios.get(SERVER_URL + 'user/' + `member_detail?idx_user=${idx_user}`, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    if(res.data.data.user_type === 99){
                        setIsSuper(true);
                    }
                } else {
                    toastNoticeError(res.data.msg);
                }
            });
    }, [])

    const refreshForm = () => {
        document.querySelector('#user_name').value = '';
        document.querySelector('#user_id').value = '';
        setNewUser({});
    }

    const fillUserInfo = (e) => {
        let fillInfo = {...newUser};
        fillInfo[e.target.id] = e.target.value;
        setNewUser(fillInfo);
    };

    const submitNewUser = async () => {
        if(isDoing){
            return toastNoticeInfo('처리중입니다. 잠시만 기다려 주세요.', '');
        }
        isDoing = true;
        if(!/^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/.test(newUser.user_id)){
            return toastNoticeError('이메일 형식에 맞지 않습니다.', '');
        }
        if(!isSuper || !newUser.user_type){
            newUser.user_type = 1;
        }

        await axios.post(SERVER_URL + 'user/create', newUser, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess(res.data.msg, '');
                    navigate('/member_management');
                } else {
                    toastNoticeError(res.data.msg, '');
                }
            })
        isDoing = false;
    }

    const setUserType = (e) => {
        if(e.target.checked){
            let fillInfo = {...newUser};
            fillInfo.user_type = e.target.id === 'admin' ? 11 : 1;
            setNewUser(fillInfo);
        }
    }


    return (
        <div className="page">
            <form>
                <div className="file_upload_area">
                    <div className="head">
                        <button onClick={() => navigate('/member_management')}>
                            <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                        </button>
                        <h2>멤버 생성하기</h2>
                    </div>
                </div>
                <div className="profile_area">
                    <div className="profile_box">
                        <h3>기본 정보</h3>
                        <div className="input_box">
                            <label htmlFor="user_id">이름</label>
                            <input onChange={(e) => fillUserInfo(e)} id="user_name" type="text" placeholder="홍길동"/>
                        </div>
                        <div className="input_box">
                            <label htmlFor="user_email">이메일</label>
                            <input onChange={(e) => fillUserInfo(e)} id="user_id" type="email" placeholder="아이디로 사용할 이메일을 작성해주세요."/>
                        </div>
                        {
                            isSuper ?
                            <div className="input_box">
                                <label>멤버 권한</label>
                                <div className="flex">
                                    <div className="radio_box">
                                        <input onChange={(e) => setUserType(e)} name="grade" id="admin" type="radio"/>
                                        <label htmlFor="admin">관리자</label>
                                    </div>
                                    <div className="radio_box">
                                        <input onChange={(e) => setUserType(e)} name="grade" id="normal" type="radio" defaultChecked/>
                                        <label htmlFor="normal">일반</label>
                                    </div>
                                </div>
                            </div>
                                : null
                        }
                    </div>
                    <div className="btn_box">
                        <button onClick={refreshForm} className="co1 ico_btn_refresh" type="button">초기화</button>
                        <button onClick={submitNewUser} type="button">등록하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MemberCreate;