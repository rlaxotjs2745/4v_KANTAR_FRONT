import React, {useEffect} from "react";
import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";

const Report = () => {

    const {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
    } = useCheckbox();

    const tableData = [
        {
            idx: 0,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성중',
        },
        {
            idx: 1,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성완료',
        },
        {
            idx: 2,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성중',
        },
        {
            idx: 3,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성완료',
        },
        {
            idx: 4,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성중',
        },
        {
            idx: 5,
            type: 'A20',
            code: 'P0001',
            name: 'chat-hitories13',
            date: '2022.10.25 11:07',
            status: '생성완료',
        },
    ];

    return (
        <>
            <div className="page">
                <div className="title_section">
                    <div className="title_box">
                        <h3 className="title">리포트 리스트</h3>
                        <p className="info">프로젝트 파일에서 생성된 리포트입니다.</p>
                    </div>
                </div>

                <div className="table_area">
                    <div className={checkedCount > 0 ? ' table_option_box' : 'hide table_option_box'}>
                        <div className="left">
                            <p className="info">{checkedCount}개의 파일이 선택되었습니다.</p>
                        </div>
                        <div className="right">
                            <button type="button">다운로드<img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_download.svg'}/></button>
                            <button type="button" className="border_left">선택 취소</button>
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
                        </colgroup>
                        <thead>
                        <tr>
                            <th><input type="checkbox"
                                       checked={isAllChecked}
                                       onChange={() => handleAllCheck()}/></th>
                            <th>Job No</th>
                            <th>Project ID</th>
                            <th>리포트명</th>
                            <th>리포트 생성 일자</th>
                            <th>리포트 상세</th>
                            <th>진행상태</th>
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
                                <td>{item.date}</td>
                                <td>상세보기</td>
                                <td>
                                    <span className={item.status === '생성중' ? 'co1' : ''}>
                                      {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
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

export default Report;