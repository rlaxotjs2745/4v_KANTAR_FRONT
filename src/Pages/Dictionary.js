import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const Dictionary = () => {

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
                        <h3 className="title">사전 관리</h3>
                        <p className="info">사전을 생성하고 단어를 매칭시킬 수 있습니다.</p>
                    </div>
                    <div className="btn_box">
                        <Link to="/dictionary_create" className="no_ico cds--btn">사전 생성하기</Link>
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
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>사전이름</th>
                            <th>속성</th>
                            <th>표제어 수</th>
                            <th>등록일</th>
                            <th style={{textAlign:"center"}}>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>01</td>
                            <td>브랜드_종합01</td>
                            <td><div className="co2">기본사전</div></td>
                            <td>3</td>
                            <td>2022.10.27 18:11</td>
                            <td style={{textAlign:"center"}}>
                                <Link to={`/dictionary_update/2`} className="co1">수정</Link>
                                <button type="button" className="co3">삭제</button>
                            </td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>브랜드_종합01</td>
                            <td><div className="co2">기본사전</div></td>
                            <td>3</td>
                            <td>2022.10.27 18:11</td>
                            <td style={{textAlign:"center"}}>
                                <Link to={`/dictionary_update/3`} className="co1">수정</Link>
                                <button type="button" className="co3">삭제</button>
                            </td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>브랜드_종합01</td>
                            <td><div className="co2">기본사전</div></td>
                            <td>3</td>
                            <td>2022.10.27 18:11</td>
                            <td style={{textAlign:"center"}}>
                                <Link to={`/dictionary_update/4`} className="co1">수정</Link>
                                <button type="button" className="co3">삭제</button>
                            </td>
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

export default Dictionary;