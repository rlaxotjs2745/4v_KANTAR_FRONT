import Modal from "./Modal";
import React from "react";

const ProjectCreateWordCloudModal = ({
                                         handleModalClose4,
                                         input2,
                                         handleChange,
                                         setInput2,
                                         handleButtonClick5,
                                     }) => {
    return (
        <Modal onClose={handleModalClose4}>
            <div className="modal_title_box">
                <h3 className="tit">새 워드 클라우드</h3>
                <button onClick={handleModalClose4}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
            </div>
            <div className="input_text_area">
                <div className="flex word_cloud">
                    <div className="input_box">
                        <label htmlFor="project_name required"><em className="title required">새 워드 클라우드 이름</em><span>{input2.characters}/20</span></label>
                        <input onChange={(event) => handleChange(setInput2, event)} type="text" maxLength="20"/>
                    </div>
                    <button type="button" className="plus cds--btn">생성하기</button>
                </div>
            </div>
            <div className="cloud_history_area">
                <strong className="tit">클라우드 생성 히스토리</strong>
                <div className="cloud_history_box">
                    <div className="table_area">
                        <table className="table_type1">
                            <colgroup>
                                <col/>
                                <col/>
                                <col/>
                                <col/>
                            </colgroup>
                            <thead>
                            <tr>
                                <th>이름</th>
                                <th>필터</th>
                                <th>생성일자</th>
                                <th>상세보기</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            <tr>
                                <td>워드클라우드A01</td>
                                <td>
                                    <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                    <button className="hover_count" type="type">키워드</button>
                                </td>
                                <td>2022.10.21 16:33</td>
                                <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="table_pagination">
                            <span className="page_num">Page 1</span>
                            <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                            <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ProjectCreateWordCloudModal;