
import {Button, Checkbox, Toggle} from '@carbon/react';
import React, {useEffect} from "react";
import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";
import {useCheckbox2} from "../Util/useCheckbox";
import Modal from "../Components/Cards/Modal";

const Home = () => {
    const {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
        handleResetCheck
    } = useCheckbox();

    const {
        isAllChecked2,
        checkedState2,
        checkedCount2,
        handleAllCheck2,
        handleMonoCheck2,
    } = useCheckbox2();

    const [showModal, setShowModal] = useState(false); // 프로젝트 병합 버튼 누르면 나오는 모달
    const [showModal2, setShowModal2] = useState(false); // 바로가기 버튼 누르면 나오는 모달

    // 프로젝트 병합
    const handleButtonClick = () => {
        setShowModal(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose = () => {
        setShowModal(false);
        document.body.classList.remove('fixed');
    };

    // 바로가기
    const handleButtonClick2 = () => {
        setShowModal2(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose2 = () => {
        setShowModal2(false);
        document.body.classList.remove('fixed');
    };

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
                            <button onClick={handleButtonClick} type="button">프로젝트 병합<img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_plus.svg'}/></button>
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
                                    <button onClick={
                                        item.status === '생성중' ? null:
                                            item.status === '바로가기' ? handleButtonClick2 : null
                                    } className={
                                        item.status === '생성중' ? 'co1 no_cursor' :
                                            item.status === '바로가기' ? 'co2'
                                                : ''
                                    }>
                                        {item.status}
                                    </button>
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

            {/* 프로젝트 병합 누르면 나오는 모달 */}
            {showModal && (
                <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose}>
                    <div className="modal_title_box">
                        <h3 className="tit">새 병합 프로젝트</h3>
                        <button onClick={handleModalClose}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <div className="input_text_area">
                        <div className="flex">
                            <div className="input_box fb30">
                                <label htmlFor="job_no"><em className="title required">Job No</em></label>
                                <input  type="text" id="job_no" maxLength="10"/>
                            </div>
                            <div className="input_box">
                                <label htmlFor="project_name required"><em className="title required">파일명</em></label>
                                <input type="text" id="project_name" maxLength="50"/>
                                <p className="tip">* 기본 파일명은 가장 먼저 생성된 파일명으로 설정됩니다.</p>
                            </div>
                        </div>
                    </div>

                    <div className="table_area">
                        <div className={checkedCount2 > 0 ? ' table_option_box' : 'hide table_option_box'}>
                            <div className="left">
                                <p className="info">{checkedCount2}개의 파일이 선택되었습니다.</p>
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
                            </colgroup>
                            <thead>
                            <tr>
                                <th><input type="checkbox"
                                           checked={isAllChecked2}
                                           onChange={() => handleAllCheck2()}/></th>
                                <th>Job No</th>
                                <th>Project ID</th>
                                <th>파일명</th>
                                <th>생성자</th>
                                <th>프로젝트 생성 일자</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tableData.map((item) => (
                                <tr key={item.idx}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={checkedState2[item.idx]}
                                            onChange={() => handleMonoCheck2(item.idx)}
                                        />
                                    </td>
                                    <td>{item.type}</td>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.user_name}</td>
                                    <td>{item.date}</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </div>

                    <div className="fixed_btn_box">
                        <button onClick={handleModalClose} type="button">취소</button>
                        <button type="button" className="co1">병합하기</button>
                    </div>
                </Modal>
            )}

            {/* 생성된 각 프로젝트별 바로가기 */}
            {showModal2 && (
                <Modal onClose={handleModalClose2}>
                    <div className="modal_title_box">
                        <h3 className="tit">리포트 생성내역</h3>
                        <button onClick={handleModalClose2}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <div className="report_create_list">
                        <ul>
                            <li><Link to='/report_detail/0'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                            <li><Link to='/report_detail/1'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                            <li><Link to='/report_detail/2'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                            <li><Link to='/report_detail/3'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                            <li><Link to='/report_detail/4'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                            <li><Link to='/report_detail/5'>chocolate-candy-drinks brandnew survey legacy_rpt001</Link></li>
                        </ul>
                    </div>

                </Modal>
            )}


        </>
    )
}

export default Home;