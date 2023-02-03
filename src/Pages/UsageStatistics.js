import React, {useEffect} from "react";
import { DatePicker, DatePickerInput } from '@carbon/react';
import $ from "jquery";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const UsageStatistics = () => {

    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    function toggleClass() {
        const topElement = document.querySelector('.top');
        const contentElement = document.querySelector('.content');

        topElement.classList.toggle('on');
        contentElement.classList.toggle('on');
    }

    useEffect(()=> {
        axios.post(SERVER_URL + 'statistics/system_statistics', AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                console.log(res.data)
            } else {

            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })

        axios.post(SERVER_URL + 'statistics/api_user', AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                console.log(res.data)
            } else {

            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })


    },[])

    return (
        <>
            <div className="page">
                <div className="usage_area">
                    <div className="usage_box">
                        <h2>API 사용량</h2>
                        <div className="search_filter_box">
                            <div className="top">
                                <button onClick={toggleClass}>검색 설정</button>
                            </div>
                            <div className="content">
                                <div className="box">
                                    <strong className="tit">멤버 이름</strong>
                                    <div className="input_box">
                                        <input type="checkbox" id="chk_all_member"/>
                                        <label htmlFor="chk_all_member">전체</label>
                                    </div>
                                    <div className="search_section">
                                        <div className="input_box">
                                            <input type="text" placeholder="멤버 이름을 입력하세요."/>
                                            <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="box">
                                    <strong className="tit">기간 설정</strong>
                                    <DatePicker dateFormat="m/d/Y" datePickerType="range">
                                        <DatePickerInput
                                            id="date-picker-range-start"
                                            placeholder="mm/dd/yyyy"
                                            labelText="시작 날짜"
                                            type="text"
                                        />
                                        <DatePickerInput
                                            id="date-picker-range-end"
                                            placeholder="mm/dd/yyyy"
                                            labelText="종료 날짜"
                                            type="text"
                                        />
                                    </DatePicker>
                                </div>
                                <div className="btn_box">
                                    <button className="no_ico cds--btn">조회하기</button>
                                </div>
                            </div>
                        </div>
                        <div className="usage_table">
                            <table>
                                <colgroup>
                                    <col/>
                                    <col/>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th className="tgl">API 종류</th>
                                    <th className="tgr">요약 API 사용량</th>
                                    <th className="tgr">키워드 추출 API 사용량</th>
                                    <th className="tgr">데이터베이스 사용량</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>다글로 API</td>
                                    <td className="tgr">24,343,646 chars</td>
                                    <td className="tgr">325,554 chars</td>
                                    <td className="tgr">-</td>
                                </tr>
                                <tr>
                                    <td>네이버 API</td>
                                    <td className="tgr">243,366 chars</td>
                                    <td className="tgr">3,244,433 chars</td>
                                    <td className="tgr">-</td>
                                </tr>
                                <tr>
                                    <td>AWS</td>
                                    <td className="tgr">-</td>
                                    <td className="tgr">-</td>
                                    <td className="tgr">21,456 mb</td>
                                </tr>
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>합계</th>
                                    <th className="tgr">24,565,342 chars</th>
                                    <th className="tgr">3,574,537 chars</th>
                                    <th className="tgr">21,456 mb</th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <div className="usage_box">
                        <h2>시스템 사용 현황</h2>
                        <div className="usage_table max600">
                            <table>
                                <colgroup>
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead>
                                <tr>
                                    <th className="tgl">항목명</th>
                                    <th>사용량</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>누적 데이터 건수(파일수)</td>
                                    <td className="tgr">1,234,234,234 ea</td>
                                </tr>
                                <tr>
                                    <td>누적 데이터 량(글자수)</td>
                                    <td className="tgr">234,234 chars.</td>
                                </tr>
                                <tr>
                                    <td>누적 데이터 량(용량,Mb)</td>
                                    <td className="tgr">775,453,546 mb</td>
                                </tr>
                                <tr>
                                    <td>누적 생성 리포트 수</td>
                                    <td className="tgr">54,234 ea</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsageStatistics;