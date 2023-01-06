import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useCallback, useState } from 'react';

import FileDropzone from "../Components/Cards/FileDropzone";

const ReportDetail = () => {

    const navigate = useNavigate()

    function copyToClipboard(event) {
        const textarea = event.target.previousSibling;
        navigator.clipboard.writeText(textarea.value);
    }


    return(
        <>
            <div className="page">
                <div className="file_upload_area">
                    <div className="head type2">
                        <h2>SL00001_PJ002_choat-histories_김설문_리포트001</h2>
                        <button onClick={() => navigate('/report')}>
                            <img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete.svg'}/>
                        </button>
                    </div>

                    <div className="report_detail_area">
                        <form>
                            <div className="flex">
                                <div className="input_box">
                                    <label htmlFor="detail_name">프로젝트 이름</label>
                                    <input id="detail_name" type="text" readOnly defaultValue="SL00001_PJ002_chat-hitories13_김설문"/>
                                </div>
                                <div className="input_box">
                                    <label htmlFor="detail_time">생성 일자</label>
                                    <input id="detail_time" type="text" readOnly defaultValue="2022. 04. 15 22:09"/>
                                </div>
                            </div>
                            <div className="input_box">
                                <label htmlFor="detail_content">프로젝트 세부내용</label>
                                <textarea id="detail_content" className="h200" readOnly defaultValue="세부내용입니다"/>
                            </div>
                            <div className="input_box">
                                <label htmlFor="detail_filter">적용된 필터값</label>
                                <div className="filter_area">
                                    <div className="filter_box">
                                        <strong className="tit">화자</strong>
                                        <span className="keyword">화자 A</span>
                                        <span className="keyword">화자 D</span>
                                        <span className="keyword">화자 E</span>
                                    </div>
                                    <div className="flex">
                                        <div className="filter_box">
                                            <strong className="tit">챕터</strong>
                                            <span className="keyword">챕터 A</span>
                                            <span className="keyword">챕터 C</span>
                                            <span className="keyword">챕터 R</span>
                                        </div>
                                        <div className="filter_box">
                                            <strong className="tit">서브챕터</strong>
                                            <span className="keyword">서브챕터 A-1</span>
                                            <span className="keyword">서브챕터 C-1</span>
                                        </div>
                                    </div>
                                    <div className="filter_box">
                                        <strong className="tit">질문</strong>
                                        <span className="keyword">질문 A-1-1</span>
                                        <span className="keyword">질문 A-1-2</span>
                                    </div>
                                    <div className="filter_box">
                                        <strong className="tit">키워드</strong>
                                        <span className="keyword">키워드 01</span>
                                        <span className="keyword">키워드 02</span>
                                        <span className="keyword">키워드 03</span>
                                        <span className="keyword">키워드 04</span>
                                        <span className="keyword">키워드 05</span>
                                    </div>
                                </div>
                            </div>
                            <div className="input_box">
                                <label>전체 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>
                                <div className="edit">
                                    <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.
                                              원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.
                                              아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>
                                    <div className="edit_btn_box">
                                        <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="input_box">
                                <label>ChapterA 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>
                                <div className="edit">
                                    <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.
                                              원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.
                                              아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>
                                    <div className="edit_btn_box">
                                        <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="input_box">
                                <label>Sub ChapterA 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>
                                <div className="edit">
                                    <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.
                                              원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.
                                              아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>
                                    <div className="edit_btn_box">
                                        <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
                            <div className="input_box">
                                <label>질문A 요약문 (요약문은 사용자가 직접 수정이 가능합니다.) <span>edited <em className="required">*</em> 0/500</span></label>
                                <div className="edit">
                                    <textarea className="h200" defaultValue="원래제로음료의 느낌이 잘 안나서 아쉽다. 사무실에 있었던 장명이 평소 일상과 비슷하여 공감이 간다.
                                              원래도 좋아하는 편이라 광고가 딱히 호불호에 영향을 주지 않아서 3점을 줬다.라임맛인지 부각이 잘 안되는 점이 있어서 4점을 줬다.
                                              아쉬운부분이 있으면서도 톡 쏘는 탄산을 먹을때 어떤 느낌인지는 정확히 전달이 되었다."/>
                                    <div className="edit_btn_box">
                                        <button className="copy" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_copy.svg'}/></button>
                                        <button className="edit" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_edit.svg'}/></button>
                                        <button className="refresh" type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh.svg'}/></button>
                                    </div>
                                </div>
                            </div>
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
                                    <tr>
                                        <td><div className="co2">User</div></td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td><div className="co2">User</div></td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>User</td>
                                        <td>명사</td>
                                        <td>43</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                    <tr>
                                        <td>User Lifestyle</td>
                                        <td>사회자</td>
                                        <td>126</td>
                                        <td>2100</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>화자 1</td>
                                        <td>442</td>
                                        <td>3320</td>
                                    </tr>
                                    <tr>
                                        <td>User Lifestyle</td>
                                        <td>사회자</td>
                                        <td>126</td>
                                        <td>2100</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>화자 1</td>
                                        <td>442</td>
                                        <td>3320</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
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
                                        <th>화자</th>
                                        <th>건수</th>
                                        <th>테스트 길이</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>김초고</td>
                                        <td>4</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>김초고</td>
                                        <td>4</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>김초고</td>
                                        <td>4</td>
                                        <td>43</td>
                                    </tr>
                                    <tr>
                                        <td>김초고</td>
                                        <td>4</td>
                                        <td>43</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="input_box">
                                <label>메모 <span>edited <em className="required">*</em> 0/100</span></label>
                                <div className="edit">
                                    <textarea className="h200" placeholder="메모를 입력해 주세요."/>
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
                    </div>
                </div>
            </div>
        </>
    )

}

export default ReportDetail;