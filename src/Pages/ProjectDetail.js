import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { useCallback, useState } from 'react';

import FileDropzone from "../Components/Cards/FileDropzone";

const ProjectDetail = () => {

    const navigate = useNavigate()



    return(
        <>
            <div className="page">
                <form>
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/')}>
                                <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>SL00001_PJ002_chat-hitories13_김설문</h2>
                        </div>
                        <div className="title_section pd0">
                            <div className="title_box">
                                <h3 className="title">Raw Data</h3>
                                <p className="info">위 필터를 설정해 리포트를 생성할 수 있습니다.</p>
                            </div>
                            <div className="btn_box">
                                <Link to="/fileupload" className="cds--btn cds--btn--tertiary">워드 클라우드 열기</Link>
                                <Link to="/fileupload" className="download cds--btn cds--btn--tertiary">데이터 다운로드</Link>
                                <Link to="/fileupload" className="plus cds--btn">리포트 생성</Link>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )

}

export default ProjectDetail;