import React, {useEffect} from "react";
import {Link, useNavigate, useLocation} from 'react-router-dom';
import { useCallback, useState } from 'react';

import FileDropzone from "../Components/Cards/FileDropzone";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

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

    const [reportDetailContent, setReportDetailContent] = useState('');
    const [reportProject, setReportProject] = useState([])
    const [reportFilter, setReportFilter] = useState([])
    const [reportKeyword, setReportKeyword] = useState([])
    const [reportSummary, setReportSummary] = useState([])
    const [reportMetaChapter, setReportMetaChapter] = useState([])
    const [reportMetaSpeaker, setReportMetaSpeaker] = useState([])

    function copyToClipboard(event) {
        const textarea = event.target.previousSibling;
        navigator.clipboard.writeText(textarea.value);
    }

    // console.log(reportFilter, '필터 데이터')
    // console.log(reportKeyword, '키워드 데이터')
    // console.log(reportProject, '프로젝트 내용')
    console.log(reportSummary, '요약문 데이터')
    // console.log(reportMetaChapter, '챕터별 메타 데이터')
    // console.log(reportMetaSpeaker, '응답자별 메타 데이터')


    useEffect(()=> {
        axios.post(SERVER_URL + 'report/report_view', {'idx':pathSplit}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1') {
                setReportDetailContent(res.data.data)
                setReportProject(res.data.data.project)
                setReportFilter(res.data.data.filter)
                setReportKeyword(res.data.data.keyword)
                setReportSummary(res.data.data.report)
                setReportMetaChapter(res.data.data.metaChapter)
                setReportMetaSpeaker(res.data.data.metaSpeaker)
            } else if (res.data.success === '0') {
                toastNoticeError(res.data.msg)
                navigate('/')
            }
        }).catch(err => {
            toastNoticeError('에러가 발생했습니다.')
            console.log(err);
        })
    },[])


    return(
        <>
            <div className="page">
                <div className="file_upload_area">
                    <div className="head type2">
                        <h2>{reportProject && reportProject.project_name}</h2>
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
                            <textarea id="detail_content" className="h200" readOnly defaultValue={reportProject && reportProject.summary0}/>
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

                        <form id="frmData0">
                            <div className="input_box">
                                <label>전체 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>
                                <div className="edit">
                                    <textarea className="h200" readOnly defaultValue={reportDetailContent ? reportDetailContent.report.summary0 : ''}/>
                                    <div className="edit_btn_box">
                                        <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
                        </form>




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
                                                <td>{item.keytype === 1 ? '명사' : item.key === 2 ? '형용사' : null}</td>
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


                        <form id="frmData">
                            <div className="input_box">
                                <label>메모 <span>edited <em className="required">*</em> 0/100</span></label>
                                <div className="edit">
                                    <textarea className="h200" placeholder="메모를 입력해 주세요." defaultValue={reportProject && reportProject.summary}/>
                                    <div className="edit_btn_box">
                                        {/*<button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>*/}
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="btn_box">
                                <button className="no_ico cds--btn">설정 저장</button>
                                <button className="no_ico cds--btn">다운로드</button>
                            </div>
                        </form>


                        {/*{!reportDetailContent || reportDetailContent.project.title !== null ? null :*/}
                        {/*    <>*/}
                        {/*        <div className="input_box">*/}
                        {/*            <label>ChapterA 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>*/}
                        {/*            <div className="edit">*/}
                        {/*            <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.*/}
                        {/*                      원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.*/}
                        {/*                      아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>*/}
                        {/*                <div className="edit_btn_box">*/}
                        {/*                    <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>*/}
                        {/*                    <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>*/}
                        {/*                    <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="input_box">*/}
                        {/*            <label>Sub ChapterA 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>*/}
                        {/*            <div className="edit">*/}
                        {/*            <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.*/}
                        {/*                      원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.*/}
                        {/*                      아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>*/}
                        {/*                <div className="edit_btn_box">*/}
                        {/*                    <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>*/}
                        {/*                    <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>*/}
                        {/*                    <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="input_box">*/}
                        {/*            <label>질문A 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>*/}
                        {/*            <div className="edit">*/}
                        {/*            <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.*/}
                        {/*                      원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.*/}
                        {/*                      아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>*/}
                        {/*                <div className="edit_btn_box">*/}
                        {/*                    <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>*/}
                        {/*                    <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>*/}
                        {/*                    <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*}*/}
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReportDetail;