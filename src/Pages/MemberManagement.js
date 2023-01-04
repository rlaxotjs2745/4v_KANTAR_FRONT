import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const MemberManagement = () => {

    const tableData = [
        {
            idx: 0,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            user_name: '김설문',
            date: '2022.10.25 11:07',
            state: 'Raw data',
            status: '생성중',
        },
        {
            idx: 1,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            user_name: '김설문',
            date: '2022.10.25 11:07',
            state: 'Raw data',
            status: '생성중',
        },
        {
            idx: 2,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            user_name: '김설문',
            date: '2022.10.25 11:07',
            state: 'Raw data',
            status: '바로가기',
        },
    ];

    return (
        <>
            <div className="page">
                <div className="search_section">
                    <div className="input_box">
                        <input type="text" placeholder="검색어를 입력하세요."/>
                        <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                    </div>
                </div>
                <div className="title_section">
                    <div className="title_box">
                        <h3 className="title">멤버 관리</h3>
                        <p className="info">멤버를 초대하고 관리해보세요.</p>
                    </div>
                    <div className="btn_box">
                        <Link to="/member_create" className="no_ico cds--btn">멤버 등록하기</Link>
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
                            <th>번호</th>
                            <th>이메일</th>
                            <th>가입일</th>
                            <th>최근 로그인 날짜</th>
                            <th>멤버 상세보기</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td>2022.10.27 18:11</td>
                            <td><Link to="/member_update/1">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td></td>
                            <td><Link className="no_email" disabled to="/member_management">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td>2022.10.27 18:11</td>
                            <td><Link to="/member_update/1">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td></td>
                            <td><Link className="no_email" disabled to="/member_management">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td>2022.10.27 18:11</td>
                            <td><Link to="/member_update/1">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td></td>
                            <td><Link className="no_email" disabled to="/member_management">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td>2022.10.27 18:11</td>
                            <td><Link to="/member_update/1">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td></td>
                            <td><Link className="no_email" disabled to="/member_management">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td>2022.10.27 18:11</td>
                            <td><Link to="/member_update/1">상세보기</Link></td>
                        </tr>
                        <tr>
                            <td>김설문</td>
                            <td>seolmmon@kantar.com</td>
                            <td>2022.10.27 18:11</td>
                            <td></td>
                            <td><Link className="no_email" disabled to="/member_management">상세보기</Link></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="table_pagination">
                        <span className="page_num">Page 1</span>
                        <button className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                        <button className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default MemberManagement;