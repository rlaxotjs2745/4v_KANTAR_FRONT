import ReactWordcloud from "react-wordcloud";
import React from "react";

const ProjectWordCloudDetailModal = ({
                                         handleModalClose5,
                                         options,
                                         words
                                     }) => {

    return (
        <div className="word_cloud_detail">
            <div className="file_upload_area">
                <div className="head type2">
                    <h2>워드클라우드A02</h2>
                    <button onClick={handleModalClose5}>
                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete.svg'}/>
                    </button>
                </div>
            </div>
            <div className="word_cloud_detail_content report_detail_area">
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
                <div className="word_cloud_img_box">
                    <ReactWordcloud options={options} words={words} />
                </div>
                <div className="btn_box">
                    <a className="no_ico cds--btn" href="#none" download>이미지 다운로드</a>
                </div>
            </div>

        </div>
    )
}

export default ProjectWordCloudDetailModal;