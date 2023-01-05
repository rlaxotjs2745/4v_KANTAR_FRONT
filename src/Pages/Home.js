
import { Button, Checkbox} from '@carbon/react';
import React, {useEffect} from "react";
import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";

const Home = () => {
    const {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
        handleResetCheck
    } = useCheckbox();

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
                <div className="title_section">
                    <div className="title_box">
                        <h3 className="title">프로젝트 원본 파일</h3>
                        <p className="info">파일을 업로드하면 프로젝트 원본 파일 리스트에 추가됩니다.</p>
                    </div>
                    <div className="btn_box">
                        <Link to="/fileupload" className="upload cds--btn">파일 업로드</Link>
                    </div>
                </div>

                <div className="table_area">
                    <div className={checkedCount > 0 ? ' table_option_box' : 'hide table_option_box'}>
                        <div className="left">
                            <p className="info">{checkedCount}개의 파일이 선택되었습니다.</p>
                        </div>
                        <div className="right">
                            <button type="button">프로젝트 병합<img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_plus.svg'}/></button>
                            <button type="button">다운로드<img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_download.svg'}/></button>
                            <button onClick={handleResetCheck} type="button" className="border_left">선택 취소</button>
                        </div>
                    </div>
                    <table className="table_type1">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th><input type="checkbox"
                                       checked={isAllChecked}
                                       onChange={() => handleAllCheck()}/></th>
                            <th>Job No</th>
                            <th>Project ID</th>
                            <th>파일명</th>
                            <th>생성자</th>
                            <th>프로젝트 생성 일자</th>
                            <th>유형</th>
                            <th>프로젝트 상세</th>
                            <th>리포트</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((item) => (
                            <tr key={item.idx}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={checkedState[item.idx]}
                                        onChange={() => handleMonoCheck(item.idx)}
                                    />
                                </td>
                                <td>{item.type}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.user_name}</td>

                                <td>{item.date}</td>
                                <td>{item.state}</td>
                                <td><Link to={`/project_detail/${item.idx}`}>상세보기</Link> </td>
                                <td>
                                    <Link to={'/'} className={
                                        item.status === '생성중' ? 'co1' :
                                            item.status === '바로가기' ? 'co2'
                                                : ''
                                    }>
                                      {item.status}
                                    </Link>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                    <div className="table_pagination">
                        <span className="page_num">Page 1</span>
                        <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                        <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home;