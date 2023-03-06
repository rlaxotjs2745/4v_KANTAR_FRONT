import React, {useEffect} from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const Report = () => {

    const [checkBoxListData, setCheckBoxListData] = useState(0)
    const [searchQuery, setSearchQuery] = useState('');

    const {
        toastNoticeWarning,
    } = useToastAlert();

    const {
        isAllChecked,
        checkedState,
        checkedCount,
        handleAllCheck,
        handleMonoCheck,
        handleResetCheck,
    } = useCheckbox(checkBoxListData + 1);

    const [reportList, setReportList] = useState('')
    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [uType, setUType] = useState(11);

    const checkedIndexes = Object.keys(checkedState).filter(i => checkedState[i]).map(i => parseInt(i, 10)); // console.log(checkedIndexes, '체크된 배열값')
    const filteredProjects = Object.values(reportList).filter(project =>
        checkedIndexes.includes(project.idx_report) //checkedIndexes 가 idx_report 값을 뽑아오는거라 변경
    );


    const handleDownload = () => {
        // console.log(filteredProjects, '선택된 리스트')
        // console.log(checkedIndexes, '선택된 리스트 값')
        if(checkedIndexes.length > 1) {
            return toastNoticeWarning('1개의 리포트만 선택하여 다운로드를 진행해주세요.')
        }
        const projectIdsAsNumbers = checkedIndexes.reduce((acc, cur) => acc + Number(cur), 0); // 배열에 담긴 숫자를 전체 합산
        axios.get(SERVER_URL + 'report/download', {
            params: { "idx_report" :projectIdsAsNumbers },
            ...AXIOS_OPTION,
            responseType: 'blob',
        }).then(res => {
            const url = window.URL.createObjectURL(
                new Blob([res.data],
                    { type: res.headers["content-type"] })
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `file.xls`
            );
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err);
        });
        // axios.get(SERVER_URL + 'report/download', {
        //     params: { "idx_report" : projectIdsAsNumbers }
        // }, AXIOS_OPTION).then(res => {
        //     console.log(res)
        //     const disposition = res.headers['Content-Disposition'];
        //     console.log(disposition, '응답헤더값')
        //     let filename = 'file.xls';
        //     if (disposition) {
        //         filename = disposition.split(';')[1].split('=')[1].replace(/"/g, '');
        //     }
        //     const url = window.URL.createObjectURL(new Blob([res.data]));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', filename);
        //     document.body.appendChild(link);
        //     link.click();
        // }).catch(err => {
        //     console.log(err);
        // })

    }

    useEffect(()=> {
        fetchData();
        const intervalId = setInterval(fetchData, 1500);
        return () => clearInterval(intervalId);
    },[currentPageNumber])

    const fetchData = async (query, page) => {
        axios.post(SERVER_URL + 'report/list_report', {
            currentPage: page,
            title: query || null
        }, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1') {
                    setReportList(res.data.data.list)
                    setCheckBoxListData(res.data.data.list[0].idx_report)
                    setCurrentLastPage(() => {
                        if(Math.ceil(res.data.data.tcnt/10) * 10 - res.data.data.tcnt === 0) {
                            return Math.floor(res.data.data.tcnt/10)
                        } else {
                            return Math.floor(res.data.data.tcnt/10)+1
                        }
                    })
                    setUType(res.data.data.uType);
                } else {
                    // setStopInterval(true);
                }
            })
            .catch(err => {
                console.log(err);
                // setStopInterval(true);
            });

        // axios.post(SERVER_URL + 'report/list_report', {currentPage : currentPageNumber}, AXIOS_OPTION).then(res => {
        //     setReportList(res.data.data.list)
        //     setCheckBoxListData(res.data.data.list[0].idx_report)
        //     setCurrentLastPage(() => {
        //         if(Math.ceil(res.data.data.tcnt/10) * 10 - res.data.data.tcnt === 0) {
        //             return Math.floor(res.data.data.tcnt/10)
        //         } else {
        //             return Math.floor(res.data.data.tcnt/10)+1
        //         }
        //     })
        //     setUType(res.data.data.uType);
        // }).catch(err => {
        //     console.log(err);
        // })
    };

    let handleLeftClick = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber(currentPageNumber - 1);
            fetchData(searchQuery, currentPageNumber - 1);
        } else {
            toastNoticeWarning('첫번째 페이지 입니다.')
            setCurrentPageNumber(1);
        }
    };

    let handleRightClick = () => {
        if(currentPageNumber === currentLastPage) {
            toastNoticeWarning('마지막 페이지 입니다.')
        } else {
            setCurrentPageNumber(currentPageNumber + 1);
            fetchData(searchQuery, currentPageNumber + 1);
        }
    };

    const handleSearch = () => {
        const query = document.querySelector('#search_input').value;
        setSearchQuery(query);
        setCurrentPageNumber(1)
        fetchData(query, 1);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <div className="page">
                <div className="search_section">
                    <div className="input_box">
                        <input id="search_input" type="text" placeholder="검색어를 입력하세요." onKeyDown={handleKeyDown} />
                        <button onClick={handleSearch} type="button"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                    </div>
                    {/*<div className="input_box">*/}
                    {/*    <input type="text" placeholder="검색어를 입력하세요."/>*/}
                    {/*    <button type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>*/}
                    {/*</div>*/}
                </div>
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
                            <button onClick={handleDownload} type="button">다운로드<img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_btn_download.svg'}/></button>
                            <button onClick={handleResetCheck} type="button" className="border_left">선택 취소</button>
                        </div>
                    </div>
                    <table id="merge_list" className="table_type1">
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
                        </tbody>
                    </table>
                    {!reportList || !reportList.length ? '' :
                        <div className="table_pagination">
                            <span className="page_num">Page {currentPageNumber}</span>
                            <button type="button" onClick={handleLeftClick} className="left"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                            <button type="button" onClick={handleRightClick} className="right"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                        </div>
                    }
                </div>
            </div>


        </>
    )
}

export default Report;