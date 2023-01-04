import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const MemberCreate = () => {
    const navigate = useNavigate();

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
                            <input id="user_id" type="text" defaultValue="김설문"/>
                        </div>
                        <div className="input_box">
                            <label htmlFor="user_email">이메일</label>
                            <input id="user_email" type="email" defaultValue="seolmoon@kantar.com"/>
                        </div>
                    </div>
                    <div className="btn_box">
                        <button className="co1 ico_btn_refresh" type="button">초기화</button>
                        <button type="button">등록하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MemberCreate;