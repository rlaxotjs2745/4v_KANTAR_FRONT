import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { AXIOS_OPTION, SERVER_URL } from "../Util/env";

import FileDropzone from "../Components/Cards/FileDropzone";
import Modal from "../Components/Cards/Modal";
import {useToastAlert} from "../Util/toastAlert";

const FileUpload = () => {
    function customSort(a, b) {
        const aParts = a[0].split('_');
        const bParts = b[0].split('_');
        if (aParts[0] === bParts[0]) {
            return Number(aParts[1]) - Number(bParts[1]);
        } else {
            return a[0].localeCompare(b[0]);
        }
    }

    const {
        toastNoticeInfo,
        toastNoticeError,
    } = useToastAlert();

    const navigate = useNavigate()

    const [file, setFile] = useState(null);

    const handleFileDrop = (file) => {
        setFile(file);
    }
    // const submit = (data) => {
    //     console.log(file, '전달받은 파일')
    // }


    const [input1, setInput1] = useState({ value: '', characters: 0 });
    const [input2, setInput2] = useState({ value: '', characters: 0 });
    const [input3, setInput3] = useState({ value: '', characters: 0 });
    const [validationData, setValidationData] = useState([]);
    const validationDataReverse = Object.entries(validationData).reverse()

    function toggleClassOnSibling(element) {
        const target = element.target;
        target.nextElementSibling.classList.toggle("on");
    }

    console.log(validationDataReverse)

    function handleChange(setInputNumber, event) {
        setInputNumber({ value: event.target.value, characters: event.target.value.length });
    }
    const [showModal, setShowModal] = useState(false); // 프로젝트 병합 버튼 누르면 나오는 모달
    // 프로젝트 병합
    const checkValidation = () => {
        if (file === null) {
            return (toastNoticeError('.csv 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.'))
        }
        let formData = new FormData();

        formData.append('file', file);

        axios.post(SERVER_URL + 'project/csv_view', formData, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setValidationData(res.data)
                setShowModal(true);
                document.body.classList.add('fixed');
            } else {
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.')
        })


    };

    const handleModalClose = () => {
        setShowModal(false);
        document.body.classList.remove('fixed');
    };

    const reportCreate = (data) => { // 기본 리포트 생성 버튼

        let form = document.querySelector('#fileUploadForm');

        if (file === null) {
            return (toastNoticeError('.csv 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.'))
        }

        if (form.job_no.value === '') {
            return (toastNoticeError('필수 정보가 입력되지 않았습니다.'))
        }

        if (form.project_name.value === '') {
            return (toastNoticeError('필수 정보가 입력되지 않았습니다.'))
        }

        let formData = new FormData();

        formData.append('idx_user', 1);
        formData.append('file', file);
        formData.append('job_no', form.job_no.value)
        formData.append('project_name', form.project_name.value)
        formData.append('summary0', form.project_content.value)

        axios.post(SERVER_URL + 'report/create_report', formData, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                toastNoticeInfo('기본리포트 생성을 시작 하였습니다.')
                navigate('/')
                // toastNoticeSuccess('기본 리포트가 생성되었습니다', `/report_detail/1`)
            } else {
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.')
        })



        // toastNoticeInfo('기본리포트 생성을 시작하였습니다.', 'https://www.naver.com') 첫번째 인자로 텍스트, 두번째 인자로 링크를 전달하면됨, 링크를 '' 로 넣으면 바로가기 버튼이 사라짐.

    }
    //
    // const reportSave = () => { // 프로젝트 저장 버튼
    //
    //     const form = document.querySelector('#fileUploadForm');
    //
    //     if (file === null) {
    //         return (toastNoticeError('.csv 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.'))
    //     }
    //
    //     if (form.job_no.value === '') {
    //         return (toastNoticeError('필수 정보가 입력되지 않았습니다.'))
    //     }
    //
    //     if (form.project_name.value === '') {
    //         return (toastNoticeError('필수 정보가 입력되지 않았습니다.'))
    //     }
    //
    //     toastNoticeInfo('프로젝트 설정이 저장되었습니다.')
    // }

    return(
        <>
            <div className="page">
                <form id="fileUploadForm">
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/')}>
                                <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>파일 업로드</h2>
                        </div>
                        <div className="title_section">
                            <div className="title_box">
                                <h3 className="title">내 PC에서 첨부하거나 파일을 드래그하여 넣어주세요.</h3>
                                <p className="info">.csv 파일만 업로드 가능합니다. 용량은 최대 500kb까지 가능합니다.</p>
                            </div>
                            <div className="btn_box">
                                <button onClick={checkValidation} type="button" className="cds--btn cds--btn--tertiary">chapter validation</button>
                                <button onClick={reportCreate} type="button" className="plus cds--btn">기본 리포트 생성</button>
                            </div>
                        </div>
                        <FileDropzone onFileDrop={handleFileDrop}/>
                        <div className="input_text_area">
                            <div className="flex">
                                <div className="input_box fb30">
                                    <label htmlFor="job_no"><em className="title required">Job No</em><span>{input1.characters}/10</span></label>
                                    <input name="job_no" onInput={(event) => handleChange(setInput1, event)} type="text" id="job_no" maxLength="10"/>
                                </div>
                                <div className="input_box">
                                    <label htmlFor="project_name required"><em className="title required">프로젝트 이름</em><span>{input2.characters}/50</span></label>
                                    <input name="project_name" onInput={(event) => handleChange(setInput2, event)} type="text" id="project_name" maxLength="50"/>
                                </div>
                            </div>
                            <div className="input_box">
                                <label htmlFor="project_info"><em className="title">프로젝트 내용 (선택사항)</em><span>{input3.characters}/200</span></label>
                                <textarea name="project_content" onInput={(event) => handleChange(setInput3, event)} id="project_info" placeholder="프로젝트 세부정보를 입력해 주세요." maxLength="200"/>
                            </div>
                        </div>
                        <div className="btn_box">
                            <Link to="/">취소</Link>
                            {/* <button type="button" onClick={reportSave}>프로젝트 저장</button> */}
                        </div>
                    </div>
                </form>
            </div>

            {showModal && (
                <Modal onClose={handleModalClose}>
                    <div className="modal_title_box">
                        <h3 className="tit">Chapter validation 검사</h3>
                        <button onClick={handleModalClose}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <div className="validation_area">
                        <strong className="tit">챕터 카테고리</strong>
                        <div className="validation_box">
                            {
                                !validationDataReverse || !validationDataReverse.length ? '' :
                                    validationDataReverse.map((item) => (
                                        <div className="chapter">
                                            <button onClick={toggleClassOnSibling} className="title">{item[Object.keys(item)[0]]}</button>
                                            <div className="sub_chapter">
                                                {Object.entries(item[Object.keys(item)[1]])
                                                    .sort(customSort)
                                                    .map(([subChapterTitle, questions]) => (
                                                        <div className="title">
                                                            <button onClick={toggleClassOnSibling} className="title">{subChapterTitle}</button>
                                                            <div className="question">
                                                                {Object.entries(questions)
                                                                    .sort(customSort)
                                                                    .map(([questionTitle, person]) => (
                                                                        <p className="title">
                                                                            <button onClick={toggleClassOnSibling} className="title">{questionTitle}</button>
                                                                            <div className="person">
                                                                            {Object.entries(person).map(([personTitle, answer]) => (
                                                                                <>
                                                                                    <button onClick={toggleClassOnSibling} className="title">{personTitle}</button>
                                                                                    <div className="title answer">{answer}</div>
                                                                                </>
                                                                            ))}
                                                                            </div>
                                                                        </p>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))
                            }



                        </div>
                        <p className="tip">**챕터 카테고리를 확인 후, 올바르지 않을시 원본파일을 수정 후 다시 업로드 해주세요.</p>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default FileUpload;