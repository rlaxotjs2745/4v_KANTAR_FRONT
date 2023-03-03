import Modal from "./Modal";
import React from "react";

const ProjectCreateReportModal = ({
                                      handleModalClose2,
                                      input,
                                      handleChange,
                                      setInput,
                                      createReportCheckboxes,
                                      handleCheckboxChange,
                                      checkBoxCount3,
                                      checkBoxCount4,
                                      createReport
                                  }) => {
    return (
        <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose2}>
            <div className="modal_title_box">
                <h3 className="tit">리포트 생성</h3>
                <button onClick={handleModalClose2}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
            </div>
            <div className="input_text_area">
                <div className="flex">
                    <div className="input_box">
                        <label htmlFor="project_name required"><em className="title required">프로젝트 이름</em><span>{input.characters}/50</span></label>
                        <input onInput={(event) => handleChange(setInput, event)} type="text" id="project_name" maxLength="50"/>
                    </div>
                </div>
            </div>
            <div className="toggle_check_box">
                <div className="left">
                    <strong className="tit">[요약할 영역을 선택해주세요.]</strong>
                    <div className="switch_box">
                        <p className="info">전체 요약을 포함할까요?</p>
                        <input type="checkbox" id="switch1" name="switch1" defaultChecked={createReportCheckboxes[0] === 1} onChange={(event) => handleCheckboxChange(0, event)} className="input__on-off" />
                        <label htmlFor="switch1" className="label__on-off">
                            <span className="marble"></span>
                            <span className="on"></span>
                            <span className="off"></span>
                        </label>
                    </div>
                    <div className="switch_box">
                        <p className="info">챕터별 요약을 포함 할까요? (기본값 *)</p>
                        <input type="checkbox" id="switch2" name="switch5" defaultChecked={true} disabled={true} className="input__on-off"/>
                        <label htmlFor="switch2" className="label__on-off">
                            <span className="marble"></span>
                            <span className="on"></span>
                            <span className="off"></span>
                        </label>
                    </div>
                    <div className="switch_box">
                        <p className="info">서브 챕터별 요약을 포함 할까요?</p>
                        <input type="checkbox" id="switch3" name="switch3"  defaultChecked={createReportCheckboxes[1] === 1} onChange={(event) => handleCheckboxChange(1, event)} className="input__on-off" disabled={checkBoxCount3 === 0} />
                        <label htmlFor="switch3" className="label__on-off">
                            <span className="marble"></span>
                            <span className="on"></span>
                            <span className="off"></span>
                        </label>
                    </div>
                    <div className="switch_box">
                        <p className="info">질문별 요약을 포함 할까요?</p>
                        <input type="checkbox" id="switch4" name="switch4" className="input__on-off"  checked={createReportCheckboxes[2] === 1} onChange={(event) => handleCheckboxChange(2, event)} disabled={checkBoxCount4 === 0}/>
                        <label htmlFor="switch4" className="label__on-off">
                            <span className="marble"></span>
                            <span className="on"></span>
                            <span className="off"></span>
                        </label>
                    </div>
                </div>
                <div className="right">
                    <strong className="tit">[추가 옵션을 선택해 주세요.]</strong>
                    <div className="switch_box">
                        <p className="info">키워드 추출시 한 글자는 제외 하겠습니까?</p>
                        <input type="checkbox" id="switch5" name="switch2" className="input__on-off" checked={createReportCheckboxes[3] === 1} onChange={(event) => handleCheckboxChange(3, event)}/>
                        <label htmlFor="switch5" className="label__on-off">
                            <span className="marble"></span>
                            <span className="on"></span>
                            <span className="off"></span>
                        </label>
                    </div>
                    <div className="label_box">
                        <div className="left">
                            <span>키워드 품사 형태를 선택하여 보겠습니까?</span>
                            <p className="tip">(* 1개 이상의 품사 선택 필요)</p>
                        </div>
                        <div className="right">
                            <div className="input_box"><input id="chk11" type="checkbox" checked={createReportCheckboxes[4] === 1 || createReportCheckboxes[4] === 3} onChange={(event) => handleCheckboxChange(4, event, 'chk')}/><label htmlFor="chk11">명사</label></div>
                            <div className="input_box"><input id="chk22" type="checkbox" checked={createReportCheckboxes[4] === 2 || createReportCheckboxes[4] === 3} onChange={(event) => handleCheckboxChange(4, event, 'chk')}/><label htmlFor="chk22">형용사</label></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed_btn_box">
                <p className="tip">* 항목들은 선택된 필터에 따라 활성화 혹은 비활성화 될 수 있습니다.</p>
                <button onClick={handleModalClose2} type="button">취소</button>
                <button onClick={createReport} type="button" className="co1">생성하기</button>
            </div>

        </Modal>
    )

}

export default ProjectCreateReportModal;