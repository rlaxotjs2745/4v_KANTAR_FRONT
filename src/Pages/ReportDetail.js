import React, {useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useCallback, useState } from 'react';
import FileDropzone from "../Components/Cards/FileDropzone";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";
import { writeFileXLSX } from 'xlsx';

const ReportDetail = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const { pathname } = useLocation();
    const navigate = useNavigate()
    const pathSplit = Number(pathname.split('/')[2])

    const [reportProject, setReportProject] = useState([])
    const [reportFilter, setReportFilter] = useState([])
    const [reportKeyword, setReportKeyword] = useState([])
    const [reportSummary, setReportSummary] = useState([])
    const [reportMetaChapter, setReportMetaChapter] = useState([])
    const [reportMetaSpeaker, setReportMetaSpeaker] = useState([])
    const [textAreaValues, setTextAreaValues] = useState({});
    const [edited, setEdited] = useState({});
    const [readOnly, setReadOnly] = useState({});
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [editedReports, setEditedReports] = useState([]);

    const [textValue2, setTextValue2] = useState(reportProject ? reportProject.summary : ""); // 메모 텍스트 내용
    const [summary, setSummary] = useState(null); // 메모 기본 내용
    const [textCount, setTextCount] = useState(0); // 메모 카운트
    const [isOwn, setIsOwn] = useState(false);
    const [uType, setUType] = useState(11);


    useEffect(()=>{
        setReadOnly(Array(reportSummary.length).fill(true))
    },[reportSummary])

    useEffect(()=>{
        setSummary(reportProject && reportProject.summary)
    }, [reportProject])

    // console.log(reportFilter, '필터 데이터')
    // console.log(reportKeyword, '키워드 데이터')
    // console.log(reportProject, '프로젝트 내용')
    // console.log(reportSummary, '요약문 데이터')
    // console.log(reportMetaChapter, '챕터별 메타 데이터')
    // console.log(reportMetaSpeaker, '응답자별 메타 데이터')


    // useEffect(()=>{
    //     console.log(editedReports, '값 확인')
    // },[editedReports])

    useEffect(()=> {
        axios.post(SERVER_URL + 'report/report_view', {'idx':pathSplit}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1') {
                setReportProject(res.data.data.project)
                setReportFilter(res.data.data.filter)
                setReportKeyword(res.data.data.keyword)
                setReportSummary(res.data.data.report)
                setReportMetaChapter(res.data.data.metaChapter)
                setReportMetaSpeaker(res.data.data.metaSpeaker)
                setIsOwn(Boolean(res.data.data.isOwn));
                setUType(res.data.data.uType);
            } else if (res.data.success === '0') {
                toastNoticeError(res.data.msg)
                navigate('/')
            }
        }).catch(err => {
            toastNoticeError('에러가 발생했습니다.')
            console.log(err);
        })
    },[])

    function copyToClipboard(event) {
        const textarea = event.target.parentNode.parentNode.previousSibling
        navigator.clipboard.writeText(textarea.value);
        toastNoticeSuccess('클립보드에 내용이 복사되었습니다.')
    }

    function toggleReadOnly(e, index) {
        if (reportSummary[index]) {
            setReadOnly({ ...readOnly, [`${index}`]: !readOnly[`${index}`] });
        }
    }

    const handleTextareaChange = (e, index) => {

        setTextAreaValues({ ...textAreaValues, [index]: e.target.value });
        setEdited({ ...edited, [index]: e.target.value !== reportSummary[index].summary0 });

        const idx_report_data = reportSummary[index].idx_report_data;
        const value = e.target.value;

        let updated = false;
        const newEditedReports = editedReports.map(item => {
            if (item.idx_report_data === idx_report_data) {
                updated = true;
                return { ...item, value };
            }
            return item;
        });

        if (!updated) {
            newEditedReports.push({ idx_report_data, value });
        }

        setEditedReports(newEditedReports);
    };

    const handleRefreshClick = (e, index) => {
        if (reportSummary[index]) {
            setTextAreaValues({
                ...textAreaValues,
                [index]: reportSummary[index].summary0,
            });
            setEdited({ ...edited, [index]: false });
            setReadOnly({ ...readOnly, [`${index}`]: true });
            setEditedReports(
                editedReports.filter(item => item.idx_report_data !== reportSummary[index].idx_report_data)
            );
        }
    };


    // 기본
    const toggleReadOnly2 = () => {
        setIsReadOnly(!isReadOnly);
    };

    const handleTextChange2 = event => {
        setSummary(event.target.value);
        setTextCount(event.target.value.length);
        setTextValue2(event.target.value);
    };

    const handleRefreshClick2 = () => {
        setIsReadOnly(true);
        setSummary(reportProject.summary);
    };

    const reportSubmit = () => {
        const substitutionData = editedReports.map(item => ({
            "idx_data": item.idx_report_data,
            "summary_md": item.value
        }));
        const param = {
            "title" : document.getElementById('report_title').value,
            "idx_report" : reportSummary[0].idx_report,
            "summary0": summary,
            "reportList" : substitutionData
        }
        axios.post(SERVER_URL + 'report/mod_report', param, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                toastNoticeSuccess(res.data.msg)
                navigate('/report')
            } else {
                toastNoticeWarning(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.')
        })
    }

    // const reportDownload = () => {
    //     axios.get(SERVER_URL + 'report/download', {
    //         params: { "idx_report" : reportSummary[0].idx_report }
    //     }, AXIOS_OPTION).then(res => {
    //         console.log(res)
    //         const disposition = res.headers['Content-Disposition'];
    //         console.log(disposition, '응답헤더값')
    //         let filename = 'file.xls';
    //         if (disposition) {
    //             filename = disposition.split(';')[1].split('=')[1].replace(/"/g, '');
    //         }
    //         const url = window.URL.createObjectURL(new Blob([res.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', filename);
    //         document.body.appendChild(link);
    //         link.click();
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    const reportDownload = () => {
        axios.get(SERVER_URL + 'report/download', {
            params: { "idx_report" : reportSummary[0].idx_report },
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
    }


    return(
        <>
            <div className="page">
                <div className="file_upload_area">
                    <div className="head type2">
                        <input id="report_title" name="report_title" type="text" defaultValue={reportProject && reportProject.title}/>
                        <button onClick={() => navigate('/report')}>
                            <img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete.svg'}/>
                        </button>
                    </div>

                    <div className="report_detail_area">
                        <div className="flex">
                            <div className="input_box">
                                <label htmlFor="detail_name">프로젝트 이름</label>
                                <input id="detail_name" type="text" value={reportProject && reportProject.project_name}/>
                            </div>
                            <div className="input_box">
                                <label htmlFor="detail_time">생성 일자</label>
                                <input id="detail_time" type="text" readOnly value={reportProject && reportProject.create_dt}/>
                            </div>
                        </div>
                        <div className="input_box">
                            <label htmlFor="detail_content">프로젝트 세부내용</label>
                            <textarea id="detail_content" className="h200" readOnly value={reportProject && reportProject.summary0}/>
                        </div>

                        {/*  적용된 필터값  */}
                        {reportFilter && reportKeyword.length ?
                            <div className="input_box">
                                <label htmlFor="detail_filter">적용된 필터값</label>
                                <div className="filter_area">
                                    {reportFilter && reportFilter.length ?
                                        reportFilter.filter(item => item !== null && item.filter_type === 1).length > 0 ?
                                            <div className="filter_box">
                                                <strong className="tit">화자</strong>
                                                <div className="keyword_box">
                                                    {
                                                        reportFilter.filter(item => item !== null && item.filter_type === 1)
                                                            .map(filter => (
                                                                filter.filterDataArray.map(filterData => (
                                                                    <span className="keyword">{filterData.filter_data}</span>
                                                                ))
                                                            ))
                                                    }
                                                </div>
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                    }

                                    {reportFilter && reportFilter.length ?
                                        reportFilter.filter(item => item !== null && item.filter_type === 2).length > 0 ?
                                            <div className="filter_box">
                                                <strong className="tit">챕터</strong>
                                                <div className="keyword_box">
                                                {
                                                    reportFilter.filter(item => item !== null && item.filter_type === 2)
                                                        .map(filter => (
                                                            filter.filterDataArray.map(filterData => (
                                                                <span className="keyword">{filterData.filter_data}</span>
                                                            ))
                                                        ))
                                                }
                                                </div>
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                    }

                                    {reportFilter && reportFilter.length ?
                                        reportFilter.filter(item => item !== null && item.filter_type === 3).length > 0 ?
                                            <div className="filter_box">
                                                <strong className="tit">서브챕터</strong>
                                                <div className="keyword_box">
                                                {
                                                    reportFilter.filter(item => item !== null && item.filter_type === 3)
                                                        .map(filter => (
                                                            filter.filterDataArray.map(filterData => (
                                                                <span className="keyword">{filterData.filter_data}</span>
                                                            ))
                                                        ))
                                                }
                                                </div>
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                    }

                                    {reportFilter && reportFilter.length ?
                                        reportFilter.filter(item => item !== null && item.filter_type === 4).length > 0 ?
                                            <div className="filter_box">
                                                <strong className="tit">질문</strong>
                                                <div className="keyword_box">
                                                {
                                                    reportFilter.filter(item => item !== null && item.filter_type === 4)
                                                        .map(filter => (
                                                            filter.filterDataArray.map(filterData => (
                                                                <span className="keyword">{filterData.filter_data}</span>
                                                            ))
                                                        ))
                                                }
                                                </div>
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                    }

                                    {reportFilter && reportFilter.length ?
                                        reportFilter.filter(item => item !== null && item.filter_type === 5).length > 0 ?
                                            <div className="filter_box">
                                                <strong className="tit">키워드</strong>
                                                <div className="keyword_box">
                                                {
                                                    reportFilter.filter(item => item !== null && item.filter_type === 5)
                                                        .map(filter => (
                                                            filter.filterDataArray.map(filterData => (
                                                                <span className="keyword">{filterData.filter_data}</span>
                                                            ))
                                                        ))
                                                }
                                                </div>
                                            </div>
                                            :
                                            null
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            :
                            null
                        }

                        {/* 요약문 영역 */}
                        <div className="reportSummaryBox">
                            {reportSummary && reportSummary.length ?
                                reportSummary.map((item, index) => (
                                    <div className={`input_box ${edited[index] ? 'edited' : ''}`} id={item.idx_report_data} key={item.idx_report_data}>
                                        <label>{item.filter_tp} (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> {textAreaValues[index] ? textAreaValues[index].length : 0}/500</span></label>
                                        <div className="edit">
                                            <textarea maxLength="500" className="h200" readOnly={readOnly[index]} defaultValue={item.summary0} value={textAreaValues[index] || item.summary0} onChange={e => handleTextareaChange(e, index)} />
                                            {
                                                isOwn || uType === 99 ?
                                            <div className="edit_btn_box">
                                                <button title="복사하기" onClick={copyToClipboard} className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                                <button title="편집하기" onClick={e => toggleReadOnly(e, index)} className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                                <button title="초기화" onClick={e => handleRefreshClick(e, index)} className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                            </div>
                                                    : null
                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                null
                            }
                        </div>


                        {/*  키워드 빈도  */}
                        {reportKeyword && reportKeyword.length ?
                            <div className="input_box">
                                <label>키워드 빈도 (그룹으로 등록된 키워드 이름은 파란색으로 표기됩니다.)</label>
                                <table className="table_type1 center">
                                    <colgroup>
                                        <col/>
                                        <col/>
                                        <col/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>키워드 이름</th>
                                        <th>형태</th>
                                        <th>건수</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        reportKeyword.map(item => (
                                            <tr>
                                                <td className={item.dic_yn === 1 ? 'co2' : ''}>{item.sum_keyword}</td>
                                                <td>{item.keytype === 1 ? '명사' : item.keytype === 2 ? '형용사' : null}</td>
                                                <td>{item.keycount}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            :
                            null
                        }

                        {/*  챕터별 메타 데이터  */}
                        {reportMetaChapter && reportMetaChapter.length ?
                            <div className="input_box">
                                <label>챕터별 메타 데이터</label>
                                <table className="table_type1 center">
                                    <colgroup>
                                        <col/>
                                        <col/>
                                        <col/>
                                        <col/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>챕터</th>
                                        <th>화자</th>
                                        <th>건수</th>
                                        <th>텍스트 길이</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        reportMetaChapter.map(item => (
                                            <tr>
                                                <td>{item.chapter}</td>
                                                <td>{item.speaker}</td>
                                                <td>{item.cnt}</td>
                                                <td>{item.length}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            :
                            null
                        }

                        {/* 응답자별 메타데이터 */}
                        {reportMetaSpeaker && reportMetaSpeaker.length ?
                            <div className="input_box">
                                <label>응답자별 메타 데이터</label>
                                <table className="table_type1 center">
                                    <colgroup>
                                        <col/>
                                        <col/>
                                        <col/>
                                        <col/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <th>챕터</th>
                                        <th>건수</th>
                                        <th>텍스트 길이</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        reportMetaSpeaker.map(item => (
                                            <tr>
                                                <td>{item.speaker}</td>
                                                <td>{item.cnt}</td>
                                                <td>{item.length}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            :
                            null
                        }


                        <div className={"input_box" + (summary !== (reportProject && reportProject.summary) ? " edited" : "")}>
                            <label>메모 <span>edited <em className="required">*</em> {textCount}/100</span></label>
                            <div className="edit">
                                <textarea className="h200" placeholder="메모를 입력해 주세요." readOnly={isReadOnly} value={summary} onChange={handleTextChange2} />
                                {
                                    isOwn || uType === 99 ?
                                <div className="edit_btn_box">
                                    <button title="편집하기" onClick={toggleReadOnly2} className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                    <button title="초기화" onClick={handleRefreshClick2} className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                </div>
                                        : null
                                }
                            </div>
                        </div>
                        <div className="btn_box">
                            {
                                isOwn || uType === 99 ? <button onClick={reportSubmit} type="button" className="no_ico cds--btn">설정 저장</button> : null
                            }
                            <button onClick={reportDownload} className="no_ico cds--btn">다운로드</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default ReportDetail;