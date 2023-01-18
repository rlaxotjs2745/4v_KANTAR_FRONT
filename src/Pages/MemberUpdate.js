import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const MemberUpdate = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();
    const navigate = useNavigate();

    const [userIdx, setUserIdx] = useState(window.location.pathname.split('/').reverse()[0]);
    const [userData, setUserData] = useState({});
    const [modUserData, setModUserData] = useState({})

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        axios.get(SERVER_URL + 'user/' + `member_detail?idx_user=${userIdx}`, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    setUserData(res.data.data);
                    setModUserData(res.data.data);
                } else {
                    toastNoticeError(res.data.msg);
                }
            });
    }

    const infoChange = (e) => {
        let newUserData = {...modUserData};
        newUserData[e.target.id] = e.target.value;
        setModUserData(newUserData);
    }

    const submitModifyInfo = () => {
        if(!modUserData.user_phone.match(/^\d+$/)){
            return toastNoticeError('유효하지 않은 전화번호입니다.');
        }

        axios.post(SERVER_URL + 'user/modify', modUserData, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess(res.data.msg);
                    navigate('/member_management');
                } else {
                    toastNoticeError(res.data.msg);
                }
            })
    }

    const deleteUser = () => {
        axios.post(SERVER_URL + 'user/dropout', modUserData, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess(res.data.msg);
                    navigate('/member_management');
                } else {
                    toastNoticeError(res.data.msg);
                }
            })
    }

    return (
        <div className="page">
            <form>
                <div className="file_upload_area">
                    <div className="head">
                        <button onClick={() => navigate('/member_management')}>
                            <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                        </button>
                        <h2>멤버 상세보기</h2>
                    </div>
                </div>
                <div className="profile_area">
                    <div className="profile_box">
                        <h3>{userData.user_name}</h3>
                        <p className="user_id">{userData.user_id}</p>
                    </div>
                    <div className="profile_box">
                        <h3>멤버 정보</h3>
                        <div className="input_box">
                            <label htmlFor="user_id">이름</label>
                            <input onChange={(e) => infoChange(e)} id="user_name" type="text" defaultValue={userData.user_name}/>
                        </div>
                        <div className="input_box">
                            <label htmlFor="user_tel">전화번호</label>
                            <input onChange={(e) => infoChange(e)} id="user_phone" type="tel" maxLength="11" defaultValue={userData.user_phone} />
                        </div>
                    </div>
                    <div className="btn_box">
                        <button onClick={deleteUser} className="co1" type="button">계정 삭제하기</button>
                        <button onClick={submitModifyInfo} type="button">변경사항 저장</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MemberUpdate;