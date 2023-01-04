import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const MemberUpdate = () => {
    const navigate = useNavigate();

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
                    <div className="btn_box">
                        <button className="co1" type="button">계정 삭제하기</button>
                        <button type="button">변경사항 저장</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MemberUpdate;