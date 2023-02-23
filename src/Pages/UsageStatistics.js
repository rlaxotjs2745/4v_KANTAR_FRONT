import React, {useEffect, useState} from "react";
import { DatePicker, DatePickerInput } from '@carbon/react';
import $ from "jquery";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const UsageStatistics = () => {
    const {
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const [inputFocus, setInputFocus] = useState(false);
    const [statistics, setStatistics] = useState('')
    const [userListOrigin, setUserListOrigin] = useState([])
    const [userList, setUserList] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [userIdx, setUserIdx] = useState('');
    const [filteredList, setFilteredList] = useState(userList);
    const [checkboxChecked, setCheckboxChecked] = useState(true);
    const [apiDataList, setApiDataList] = useState(null)

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClick = (item) => {
        setInputValue(`${item.user_id}(${item.user_name})`);
        setUserIdx(item.idx_user)
        setInputFocus(false)
        setFilteredList(userListOrigin)
    }

    const handleCheckboxChange = (event) => {
        setCheckboxChecked(event.target.checked);
        if (event.target.checked) {
            setInputValue('');
            setUserIdx('')
            document.getElementById('searchUserIdx').disabled = true;
            document.getElementById('date-picker-range-start').disabled = true;
            document.getElementById('date-picker-range-end').disabled = true;
            $('#date-picker-range-start').val('')
            $('#date-picker-range-end').val('')
        } else {
            document.getElementById('searchUserIdx').disabled = false;
            document.getElementById('date-picker-range-start').disabled = false;
            document.getElementById('date-picker-range-end').disabled = false;
        }
    };

    useEffect(()=>{
        setFilteredList(userList.filter(item => item.user_name.includes(inputValue) || item.user_id.includes(inputValue)));
    },[inputValue])
    useEffect(()=> {
        axios.post(SERVER_URL + 'statistics/system_statistics', AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setStatistics(res.data.data)
            } else {

            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })

        axios.post(SERVER_URL + 'statistics/api_user', AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setUserListOrigin(res.data.data)

            } else {

            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })
    },[])
    useEffect(()=>{
        setUserList(userListOrigin)
    },[userListOrigin])
    useEffect(()=>{
        setFilteredList(userList)
    },[userList])

    function toggleClass() {
        const topElement = document.querySelector('.top');
        const contentElement = document.querySelector('.content');

        topElement.classList.toggle('on');
        contentElement.classList.toggle('on');
    }

    const handleStatistics = () => {
        let start = $('#date-picker-range-start').val()
        let startDate;
        if (start) {
            startDate = new Date(`${start} GMT`).toISOString().substr(0, 10);
        } else {
            startDate = ''
        }

        let end = $('#date-picker-range-end').val()
        let endDate;
        if (end) {
            endDate = new Date(`${end} GMT`).toISOString().substr(0, 10);
        } else {
            endDate = ''
        }


        const param = {
            "idx_user" : userIdx === '' ? null : userIdx,
            "startDate" : startDate === '' ? null : startDate,
            "endDate" : endDate === '' ? null : endDate,
        }
        axios.post(SERVER_URL + 'statistics/api_statistics', param, AXIOS_OPTION).then(res => {
            if(res.data.success === '1') {
                setApiDataList(res.data.data)
                toastNoticeSuccess('API 사용량을 조회합니다.')
            } else {
              toastNoticeWarning(res.data.msg)
            }
        }).catch(err => {
            toastNoticeWarning('에러가 발생했습니다.')
        })
    }





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
                                        <input type="checkbox" id="chk_all_member" checked={checkboxChecked} onChange={handleCheckboxChange} />
                                        <label htmlFor="chk_all_member">전체</label>
                                    </div>
                                    <div className="search_section">
                                        <div className="input_box">
                                            <input value={inputValue} onChange={(e) => {setInputValue(e.target.value); setUserIdx('')}}  type="text" id="searchUserIdx" placeholder="멤버 이름을 입력하세요." autoComplete="off" onInput={handleChange} onFocus={() => setInputFocus(true)} disabled/>
                                            <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                                        </div>
                                        <div className={`user_list ${inputFocus ? 'on' : ''}`}>
                                            <ul>
                                                {
                                                    filteredList.map(item => {
                                                        return (
                                                            <li key={item.idx_user} id={item.idx_user} onClick={() => handleClick(item)}>
                                                                {item.user_id}({item.user_name})
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
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
                                            // disabled
                                        />
                                        <DatePickerInput
                                            id="date-picker-range-end"
                                            placeholder="mm/dd/yyyy"
                                            labelText="종료 날짜"
                                            type="text"
                                            // disabled
                                        />
                                    </DatePicker>
                                </div>
                                <div className="btn_box">
                                    <button type="button" onClick={handleStatistics} className="no_ico cds--btn">조회하기</button>
                                </div>
                            </div>
                        </div>

                        {apiDataList === null ?
                            null : <div className="usage_table">
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
                                        <td className="tgr">{apiDataList.user_summary} chars</td>
                                        <td className="tgr">{apiDataList.user_keyword} chars</td>
                                        <td className="tgr">-</td>
                                    </tr>
                                    <tr>
                                        <td>AWS</td>
                                        <td className="tgr">-</td>
                                        <td className="tgr">-</td>
                                        <td className="tgr">{apiDataList.user_data} mb</td>
                                    </tr>
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <th>합계</th>
                                        <th className="tgr">{apiDataList.total_summary} chars</th>
                                        <th className="tgr">{apiDataList.total_keyword} chars</th>
                                        <th className="tgr">{apiDataList.total_data} mb</th>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        }

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
                                    <td className="tgr">{statistics.file_cnt} ea</td>
                                </tr>
                                <tr>
                                    <td>누적 데이터 량(글자수)</td>
                                    <td className="tgr">{statistics.word_length} chars.</td>
                                </tr>
                                <tr>
                                    <td>누적 데이터 량(용량,Mb)</td>
                                    <td className="tgr">{statistics.file_size} mb</td>
                                </tr>
                                <tr>
                                    <td>누적 생성 리포트 수</td>
                                    <td className="tgr">{statistics.report_cnt} ea</td>
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