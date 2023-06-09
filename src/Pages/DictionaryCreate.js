import React from "react";
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

import FileDropzone from "../Components/Cards/FileDropzone";
import {useToastAlert} from "../Util/toastAlert";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";

const DictionaryCreate = () => {

    const navigate = useNavigate()
    const {
        toastNoticeSuccess,
        toastNoticeError,
    } = useToastAlert();
    const [file, setFile] = useState(null);

    const handleFileDrop = (file) => {
        setFile(file);
    }

    const [input1, setInput1] = useState({ value: '', characters: 0 })

    function handleChange(setInputNumber, event) {
        setInputNumber({ value: event.target.value, characters: event.target.value.length });
    }

    const handleSubmit = () => {
        let formData = new FormData();

        if(!file){
            return toastNoticeError('파일을 업로드하고 다시 시도해주세요.')
        }

        if(file.type !== 'text/csv'){
            return toastNoticeError('.csv (UTF-8 형식) 파일만 업로드 가능합니다. 확인 후 다시 시도해주세요.')
        }

        formData.append('file', file);
        formData.append('title', input1.value);

        axios.post(SERVER_URL + 'dict/create', formData, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess(res.data.msg);
                    navigate('/dictionary');
                } else {
                    return toastNoticeError(res.data.msg);
                }
            })
            .catch(() => toastNoticeError('서버와 통신 중 오류가 발생했습니다.'))
    }

    const handleDownload = () => {
        axios.post(SERVER_URL + 'dict/download',
            { "dic_type" : 11111 }
        , AXIOS_OPTION).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'sample_dictionary.csv');
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err);
        })
    }


    return(
        <>
            <div className="page">
                <form>
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/dictionary')}>
                                <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>사전 생성하기</h2>
                        </div>
                        <div className="title_section pd0">
                            <div className="title_box">
                                <h2 className="title_b">사전 파일 올리기</h2>
                                <h3 className="title">내 PC에서 첨부하거나 파일을 드래그하여 넣어주세요.</h3>
                                <p className="info">.csv (UTF-8 형식) 파일만 업로드 가능합니다. 용량은 최대 500kb까지 가능합니다.</p>
                            </div>
                            <div className="btn_box">
                                <a onClick={handleDownload} download className="cds--btn download2">샘플파일 다운로드</a>
                                <button type="button" onClick={handleSubmit} className="plus cds--btn">등록하기</button>
                            </div>
                        </div>
                        <FileDropzone onFileDrop={handleFileDrop}/>
                        <div className="input_text_area">
                            <div className="input_box">
                                <label htmlFor="project_name required"><em className="title required">사전 이름</em></label>
                                <input onChange={(event) => handleChange(setInput1, event)} type="text" id="project_name"/>
                            </div>
                        </div>
                        <div className="title_section">
                            <div className="title_box">
                                <h3 className="title">샘플파일(.csv UTF-8 형식) 이용 예시</h3>
                                <p className="info">첫번째 행은 항목 코드가 입력됩니다. 각 항목에 대한 내용을 해당 열에 입력해주세요.</p>
                                <img className="sample" src={process.env.PUBLIC_URL + '/assets/image/img_csv_sample.svg'} alt=""/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default DictionaryCreate;