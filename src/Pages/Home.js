
import {Button, Checkbox, Toggle} from '@carbon/react';
import React, {useEffect} from "react";
import { useRef, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useCheckbox} from "../Util/useCheckbox";
import {useCheckbox2} from "../Util/useCheckbox";
import Modal from "../Components/Cards/Modal";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";
import {getCookie} from "../Util/cookie";

const Home = () => {
    const [checkBoxListData, setCheckBoxListData] = useState(0)

    const navigate = useNavigate()

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
        handleResetCheck
    } = useCheckbox(checkBoxListData + 1);

    const {
        isAllChecked2,
        checkedState2,
        checkedCount2,
        handleAllCheck2,
        handleMonoCheck2,
    } = useCheckbox2(checkBoxListData + 1);


    const [showModal, setShowModal] = useState(false); // 프로젝트 병합 버튼 누르면 나오는 모달
    const [showModal2, setShowModal2] = useState(false); // 바로가기 버튼 누르면 나오는 모달

    const [projectList, setProjectList] = useState('')
    const [reportCreateList, setreportCreateList] = useState('')

    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)

    const [filteredList, setFilteredList] = useState([]) // const checkedIndexes = Object.keys(checkedState).filter(i => checkedState[i]) // console.log(checkedState, '체크 스테이트 확인')
    const checkedIndexes = Object.keys(checkedState).filter(i => checkedState[i]).map(i => parseInt(i, 10)); // console.log(checkedIndexes, '체크된 배열값')
    const filteredProjects = Object.values(projectList).filter(project =>
        checkedIndexes.includes(project.idx_report) //checkedIndexes 가 idx_report 값을 뽑아오는거라 변경
    );
    // console.log(filteredProjects, '체크된애들만 projectList 에서 filter로 뜯어냄')
    // console.log(projectList, '리스트 전체')
    // projectList값을 필터로 돌려서 체크된 값을 가지는 배열만 뽑아냄
    // console.log(projectList, '프로젝트 리스트 확인')
    // console.log(checkedIndexes, '체크된 idx값')

    function getProjectIds(filteredProjects, checkedIndexes) {
        return filteredProjects
            .filter(project => checkedIndexes.includes(project.idx_report))
            .map(project => project.idx_project_job_projectid);
    } // 체크 해놓은 리스트만 추출한 리스트내에서, idx_report가 일치하는것만 필터링 한 후. idx_project_job_projectid만 반환

    const handleDownload = () => {
        let projectIds = getProjectIds(filteredProjects, checkedIndexes);
        console.log(projectIds, 'idx_project_job_projectid 값');
        if(projectIds.length > 1) {
            return toastNoticeWarning('1개의 프로젝트만 선택하여 다운로드를 진행해주세요.')
        }
        const projectIdsAsNumbers = projectIds.reduce((acc, cur) => acc + Number(cur), 0); // 배열에 담긴 숫자를 전체 합산

        axios.get(SERVER_URL + 'project/download', {
            params: { "idx_project_job_projectid" : projectIdsAsNumbers }
        }, AXIOS_OPTION).then(res => {
            console.log(res)
            const disposition = res.headers['Content-Disposition'];
            console.log(disposition, '응답헤더값')
            let filename = 'file.csv';
            if (disposition) {
                filename = disposition.split(';')[1].split('=')[1].replace(/"/g, '');
            }
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err);
        })


    }


    useEffect(()=> {
        axios.post(SERVER_URL + 'project/list_project', {currentPage : currentPageNumber}, AXIOS_OPTION).then(res => {
            setProjectList(res.data.data.list)
            setCheckBoxListData(res.data.data.list[0].idx_report)
            setCurrentLastPage(() => {
                if(Math.ceil(res.data.data.tcnt/10) * 10 - res.data.data.tcnt === 0) {
                    return Math.floor(res.data.data.tcnt/10)
                } else {
                    return Math.floor(res.data.data.tcnt/10)+1
                }
            })
            // console.log(res.data.data, '데이터')
        }).catch(err => {
            console.log(err);
        })
        const fetchData = async () => {
            axios.post(SERVER_URL + 'project/list_project', {currentPage : currentPageNumber}, AXIOS_OPTION).then(res => {
                setProjectList(res.data.data.list) // idx_report 최대값 저장 해서 써야함. * 필수
                setCurrentLastPage(() => {
                    if(Math.ceil(res.data.data.tcnt/10) * 10 - res.data.data.tcnt === 0) {
                        return Math.floor(res.data.data.tcnt/10)
                    } else {
                        return Math.floor(res.data.data.tcnt/10)+1
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        };
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);

    },[currentPageNumber])


    const projectListArray = Object.values(projectList);
    const reportList = projectListArray.map(item => item.reportList);

    // 프로젝트 병합
    const handleButtonClick = () => {
        if(checkedCount < 2) {
            return toastNoticeWarning('2개의 프로젝트 이상 선택해주세요')
        }
        setShowModal(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose = () => {
        setShowModal(false);
        document.body.classList.remove('fixed');
    };

    // 바로가기
    const handleButtonClick2 = (but) => {
        let idx = but.target.parentElement.parentElement.id;
        navigate(`/report_detail/${idx}`)
    };

    const handleButtonClick3 = (but) => {
        let idx = Number(but.target.parentElement.parentElement.id);
        let filteredList = reportList[reportList.findIndex(item => item.some(report => report.idx_report === idx))]
        console.log(reportList[reportList.findIndex(item => item.some(report => report.idx_report === idx))], '필터된 리스트')
        setFilteredList(filteredList)
        setShowModal2(true);
    };

    const handleModalClose2 = () => {
        setShowModal2(false);
        document.body.classList.remove('fixed');
    };

    const handleLeftClick = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber(currentPageNumber - 1);
        } else {
            toastNoticeWarning('첫번째 페이지 입니다.')
            setCurrentPageNumber(1);
        }
    };

    const handleRightClick = () => {
        if(currentPageNumber === currentLastPage) {
            toastNoticeWarning('마지막 페이지 입니다.')
        } else {
            setCurrentPageNumber(currentPageNumber + 1)
        }

    };

    // useEffect(()=> {
    //     setCurrentLastPage(prev => {
    //         if(Math.ceil(prev/10) * 10 - prev === 0) {
    //             console.log(prev)
    //             return Math.floor(prev/10)
    //         } else {
    //             return Math.floor(prev/10)+1
    //         }
    //     })
    // },[currentLastPage])

    // console.log(currentLastPage)

    const handleMerge = () => {
        const mergeForm = document.querySelector("#merge_form")
        let selectedTrs = document.querySelectorAll("#merge_modal tr.selected");
        let ids = [];
        for (let i = 0; i < selectedTrs.length; i++) {
            ids.push(selectedTrs[i].id);
        }

        let param = {
            "job_no" : mergeForm.merge_job_no.value,
            "project_name" : mergeForm.merge_project_name.value,
            "project_merge_idx" : ids.join(',') // console.log(ids, '병합배열');
        }

        if(param.job_no === '') {
            return toastNoticeWarning('job No를 입력해주세요.')
        } else if(param.project_name === '') {
            return toastNoticeWarning('파일명을 입력해주세요.')
        } else if (param.project_merge_idx.split(",").length < 2) {
            return toastNoticeWarning('병합할 파일을 2개 이상 선택해주세요.')
        } else {
            axios.post(SERVER_URL + 'report/merge_report', param, AXIOS_OPTION).then(res => {
                // console.log(res)
                if(res.data.success === "0") {
                    toastNoticeWarning(res.data.msg)
                } else if (res.data.success === "1") {
                    toastNoticeSuccess(res.data.msg)
                    setShowModal(false);
                }

            }).catch(err => {
                console.log(err);
            })
        }
    }

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
                            <button onClick={handleDownload} type="button">다운로드<img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_download.svg'}/></button>
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
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th className="table_in_chk"><input type="checkbox"
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
                        {
                            !projectList || !projectList.length ?
                                <td colSpan="9" style={{textAlign:'center'}}>리스트가 없습니다.</td>
                                :
                                projectList.map((item) => (
                                    <tr className={item.idx_project_job_projectid} id={item.idx_report} key={item.idx_report}>
                                        <td className="table_in_chk">
                                            <input
                                                type="checkbox"
                                                checked={checkedState[item.idx_report]}
                                                onChange={() => handleMonoCheck(item.idx_report)}
                                            />
                                        </td>
                                        <td>{item.job_no}</td>
                                        <td>{item.project_id}</td>
                                        <td>{item.filename}</td>
                                        <td>{item.user_name}</td>
                                        <td>{item.create_dt}</td>
                                        <td>{item.project_type_str}</td>
                                        <td><Link to={`/project_detail/${item.idx_project}`}>상세보기</Link> </td>
                                        <td>
                                            {item.idx_report === null ?
                                                <button className="co1 no_cursor">
                                                    생성중
                                                </button>
                                                :
                                                item.reportList.length > 1 ?
                                                        <button onClick={handleButtonClick3} className="co2">
                                                            바로가기
                                                        </button>
                                                        :
                                                        <button onClick={handleButtonClick2} className="co2">
                                                            바로가기
                                                        </button>

                                            }

                                        </td>
                                    </tr>
                                ))


                        }

                        </tbody>
                    </table>
                    {!projectList || !projectList.length ? '' :
                        <div className="table_pagination">
                            <span className="page_num">Page {currentPageNumber}</span>
                            <button type="button" onClick={handleLeftClick} className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                            <button type="button" onClick={handleRightClick} className="right"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                        </div>
                    }

                </div>
            </div>

            {/* 프로젝트 병합 누르면 나오는 모달 */}
            {showModal && (
                <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose}>
                    <div className="modal_title_box">
                        <h3 className="tit">새 병합 프로젝트</h3>
                        <button onClick={handleModalClose}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <form id="merge_form">
                        <div className="input_text_area">
                            <div className="flex">
                                <div className="input_box fb30">
                                    <label htmlFor="job_no"><em className="title required">Job No</em></label>
                                    <input name="merge_job_no" type="text" id="job_no" maxLength="10"/>
                                </div>
                                <div className="input_box">
                                    <label htmlFor="project_name required"><em className="title required">파일명</em></label>
                                    <input name="merge_project_name" type="text" id="project_name" maxLength="50"/>
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
                            <table id="merge_modal" className="table_type1">
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
                                    <th className="table_in_chk"><input type="checkbox"
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

                                {
                                    !filteredProjects || !filteredProjects.length ?
                                        <td colSpan="9" style={{textAlign:'center'}}>리스트가 없습니다.</td>
                                        :
                                        filteredProjects.map((item) => (
                                            <tr id={item.idx_project} key={item.idx_project}>
                                                <td className="table_in_chk">
                                                    <input
                                                        type="checkbox"
                                                        checked={checkedState2[item.idx_report]}
                                                        onChange={() => handleMonoCheck2(item.idx_report)}
                                                    />
                                                </td>
                                                <td>{item.job_no}</td>
                                                <td>{item.project_id}</td>
                                                <td>{item.filename}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.create_dt}</td>
                                            </tr>
                                        ))
                                }
                                </tbody>
                            </table>
                        </div>

                        <div className="fixed_btn_box">
                            <button onClick={handleModalClose} type="button">취소</button>
                            <button onClick={handleMerge} type="button" className="co1">병합하기</button>
                        </div>
                    </form>
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
                            {
                                !filteredList || !filteredList.length ? '' :
                                    filteredList.map((item) =>  (
                                        <li id={item.idx_report} key={item.idx_report}><Link to={`/report_detail/${item.idx_report}`}>{item.title}</Link></li>
                                    ))
                            }
                        </ul>
                    </div>

                </Modal>
            )}


        </>
    )
}

export default Home;