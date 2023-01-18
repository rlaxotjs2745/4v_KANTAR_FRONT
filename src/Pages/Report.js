import React, {useEffect} from "react";
import { useRef, useState } from "react";
import {Link} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const Report = () => {

    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
        handleResetCheck,
    } = useCheckbox();

    const [reportList, setReportList] = useState('')

    useEffect(()=> {
        axios.post(SERVER_URL + 'report/list_report', {currentPage : 1}, AXIOS_OPTION).then(res => {
            setReportList(res.data.data)
        }).catch(err => {
            console.log(err);
        })
        const fetchData = async () => {
            axios.post(SERVER_URL + 'report/list_report', {currentPage : 1}, AXIOS_OPTION).then(res => {
                setReportList(res.data.data)
            }).catch(err => {
                console.log(err);
            })
        };
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    },[])



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
                        </colgroup>
                        <thead>
                        <tr>
                            <th className="table_in_chk"><input type="checkbox"
                                       checked={isAllChecked}
                                       onChange={() => handleAllCheck()}/></th>
                            <th>Job No</th>
                            <th>Report  ID</th>
                            <th>리포트명</th>
                            <th>리포트 생성 일자</th>
                            <th>리포트 상세</th>
                            <th>진행상태</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            !reportList || !reportList.length ?
                                   <td colSpan="8" style={{textAlign:'center'}}>리스트가 없습니다.</td>
                                :
                                reportList.map((item) => (
                                    <tr id={item.idx_report} key={item.idx_report}>
                                        <td className="table_in_chk">
                                            <input
                                                type="checkbox"
                                                checked={checkedState[item.idx_report]}
                                                onChange={() => handleMonoCheck(item.idx_report)}
                                            />
                                        </td>
                                        <td>{item.job_no}</td>
                                        <td>{item.report_id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.create_dt}</td>
                                        <td><Link to={`/report_detail/${item.idx_report}`}>상세보기</Link> </td>
                                        <td>
                                            {item.status_str === '생성중' ?
                                                <button className="co1 no_cursor">
                                                    생성중
                                                </button>
                                                :
                                                <button className=" no_cursor">
                                                    생성완료
                                                </button>
                                            }

                                        </td>
                                    </tr>
                                ))


                        }
                        {/*{reportList.map((item) => (*/}
                        {/*    <tr key={item.idx}>*/}
                        {/*        <td className="table_in_chk">*/}
                        {/*            <input*/}
                        {/*                type="checkbox"*/}
                        {/*                checked={checkedState[item.idx]}*/}
                        {/*                onChange={() => handleMonoCheck(item.idx)}*/}
                        {/*            />*/}
                        {/*        </td>*/}
                        {/*        <td>{item.type}</td>*/}
                        {/*        <td>{item.code}</td>*/}
                        {/*        <td>{item.name}</td>*/}
                        {/*        <td>{item.date}</td>*/}
                        {/*        <td><Link to={`/report_detail/${item.idx}`}>상세보기</Link></td>*/}
                        {/*        <td>*/}
                        {/*            <span className={item.status === '생성중' ? 'co1' : ''}>*/}
                        {/*              {item.status}*/}
                        {/*            </span>*/}
                        {/*        </td>*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                        </tbody>
                    </table>
                    {!reportList || !reportList.length ? '' :
                        <div className="table_pagination">
                            <span className="page_num">Page 1</span>
                            <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                            <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                        </div>
                    }
                </div>
            </div>


        </>
    )
}

export default Report;