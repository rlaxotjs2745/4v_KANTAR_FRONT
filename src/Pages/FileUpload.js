import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useCallback, useState } from 'react';

import FileDropzone from "../Components/Cards/FileDropzone";

const FileUpload = () => {

    const navigate = useNavigate()

    const [file, setFile] = useState(null);

    const handleFileDrop = (file) => {
        setFile(file);
    }
    const submit = (data) => {
        console.log(file, '전달받은 파일')
    }

    const [input1, setInput1] = useState({ value: '', characters: 0 });
    const [input2, setInput2] = useState({ value: '', characters: 0 });
    const [input3, setInput3] = useState({ value: '', characters: 0 });

    function handleChange(setInputNumber, event) {
        setInputNumber({ value: event.target.value, characters: event.target.value.length });
    }


    return(
        <>
            <div className="page">
                <form>
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/')}>
                                <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>파일 업로드</h2>
                        </div>
                        <div className="title_section">
                            <div className="title_box">
                                <h3 className="title">내 PC에서 첨부하거나 파일을 드래그하여 넣어주세요.</h3>
                                <p className="info">.csv 파일만 업로드 가능합니다. 용량은 최대 500kb까지 가능합니다.</p>
                            </div>
                            <div className="btn_box">
                                <Link to="/fileupload" className="cds--btn cds--btn--tertiary">chapter validation</Link>
                                <Link to="/fileupload" className="plus cds--btn">기본 리포트 생성</Link>
                            </div>
                        </div>
                        <FileDropzone onFileDrop={handleFileDrop}/>
                        <div className="input_text_area">
                            <div className="flex">
                                <div className="input_box fb30">
                                    <label htmlFor="job_no"><em className="title required">Job No</em><span>{input1.characters}/10</span></label>
                                    <input onChange={(event) => handleChange(setInput1, event)} type="text" id="job_no" maxLength="10"/>
                                </div>
                                <div className="input_box">
                                    <label htmlFor="project_name required"><em className="title required">프로젝트 이름</em><span>{input2.characters}/50</span></label>
                                    <input onChange={(event) => handleChange(setInput2, event)} type="text" id="project_name" maxLength="50"/>
                                </div>
                            </div>
                            <div className="input_box">
                                <label htmlFor="project_info"><em className="title">프로젝트 내용 (선택사항)</em><span>{input3.characters}/200</span></label>
                                <textarea onChange={(event) => handleChange(setInput3, event)} id="project_info" placeholder="프로젝트 세부정보를 입력해 주세요." maxLength="200"/>
                            </div>
                        </div>
                        <div className="btn_box">
                            <Link to="/">취소</Link>
                            <button type="button" onClick={submit}>프로젝트 저장</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default FileUpload;