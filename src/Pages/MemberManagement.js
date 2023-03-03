import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useToastAlert} from "../Util/toastAlert";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import MemberManagementEntity from "../Components/Cards/MemberManagementEntity";

const MemberManagement = () => {

    const {
        toastNoticeInfo,
        toastNoticeWarning
    } = useToastAlert();

    const [idx_user, setIdx_user] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchWord, setSearchWord] = useState('');
    const [userList, setUserList] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [notAdmin, setNotadmin] = useState(true);

    useEffect(() => {
        getListMember(true)
    }, [currentPage, isSearched])

    const getListMember = (curPage) => {
        let endpoint = `list_member`;
        let param = '';
        if(curPage){
            param = `?currentPage=${currentPage}`;
        }
        if(isSearched){
            param = param === '' ? `user_name=${searchWord}` : param + `&user_name=${searchWord}`;
        }

        if(param !== ''){
            endpoint += param;
        }

        axios.get(SERVER_URL + 'user/' + endpoint, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    if(res.data.data.userList.length === 0 && currentPage !== 0){
                        setCurrentPage(currentPage - 1);
                        return toastNoticeInfo('마지막 페이지입니다.');
                    }
                    setUserList(res.data.data.userList);
                    setIdx_user(res.data.data.idx_user);
                    setNotadmin(false);
                } else {
                    setNotadmin(true);
                    return toastNoticeWarning(res.data.msg, '/home', null, '메인으로 돌아가기');
                }
            })

    }

    const movePage = (type) => {
        if(notAdmin){
            return toastNoticeWarning('관리자만 가능한 기능입니다.', '/home', null, '메인으로 돌아가기');
        }
        if(currentPage === 0 && type === 0){
            return toastNoticeInfo('첫 페이지입니다.');
        }
        setCurrentPage(type === 1 ? currentPage + 1 : currentPage - 1);
    }

    const changeSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const searchUser = () => {
        if(notAdmin){
            return toastNoticeWarning('관리자만 가능한 기능입니다.', '/home', null, '메인으로 돌아가기');
        }
        setIsSearched(true);
        getListMember(true);
    }

    const addEnterEventListener = () => {
        if(notAdmin){
            return toastNoticeWarning('관리자만 가능한 기능입니다.', '/home', null, '메인으로 돌아가기');
        }
        if(window.event.keyCode === 13){
            searchUser();
        }
    }

    return (
        <>
            {
                !notAdmin ?
            <div className="page">
                <div className="search_section">
                    <div className="input_box">
                        <input onChange={changeSearchWord} onKeyUp={addEnterEventListener} type="text" placeholder="검색어를 입력하세요."/>
                        <button onClick={searchUser}><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                    </div>
                </div>
                <div className="title_section">
                    <div className="title_box">
                        <h3 className="title">멤버 관리</h3>
                        <p className="info">멤버를 초대하고 관리해보세요.</p>
                    </div>
                    <div className="btn_box">
                        {
                            !notAdmin ? <Link to="/member_create" className="no_ico cds--btn">멤버 등록하기</Link> : null
                        }
                    </div>
                </div>

                <div className="table_area">
                    <table className="table_type1">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>가입일</th>
                            <th>최근 로그인 날짜</th>
                            <th>멤버 상세보기</th>
                        </tr>
                        </thead>
                        <tbody>
                        {!notAdmin && userList && userList.length !== 0 ? userList.map(dt => dt.user_status == 0 ? <MemberManagementEntity key={dt.idx_user} user={dt} isConfirmUser={false} /> : <MemberManagementEntity key={dt.idx_user} user={dt} isConfirmUser={true} />) : null}
                        </tbody>
                    </table>
                    <div className="table_pagination">
                        <span className="page_num">Page 1</span>
                        <button onClick={() => movePage(0)} className="left"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                        <button onClick={() => movePage(1)} className="left"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                    </div>
                </div>
            </div> : null
            }
        </>
    )
}

export default MemberManagement;