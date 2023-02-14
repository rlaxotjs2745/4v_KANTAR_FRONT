import React, {useState} from "react";

const ProjectQuestionFilterModal = ({
                                        handleModalFilterClose4,
                                        showFilterModal4,
                                        handleCheckAll4,
                                        checkAll4,
                                        uniqueQuestions,
                                        selectedLabelsQuestions,
                                        handleModalFilterSubmit4,
                                        handleCheckboxChangeQuestions
                                    }) => {

    return (
        <div onClick={handleModalFilterClose4} className={showFilterModal4? 'modal_area on' : 'modal_area off'}>
            <div className="modal_layout">
                <div className="modal"  >
                    <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                        <div className="modal_title_box baseline">
                            <div className="title_box">
                                <h3 className="tit">질문 필터</h3>
                                <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                            </div>
                            <button onClick={handleModalFilterClose4}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                        </div>
                        <div className="filter_check_box">
                            <div className="input_box end">
                                <input type="checkbox" id="filter4" onChange={handleCheckAll4} checked={checkAll4}/>
                                <label htmlFor="filter4">전체선택</label>
                            </div>
                            <>
                                {uniqueQuestions.map(item => (
                                    <div className="input_box">
                                        <input id={item} type="checkbox" onChange={(e) => handleCheckboxChangeQuestions(e, item)} checked={selectedLabelsQuestions.includes(item)}/>
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                            </>
                        </div>
                        <div className="fixed_btn_box">
                            <button onClick={handleModalFilterClose4} type="button">취소</button>
                            <button onClick={handleModalFilterSubmit4} type="button" className="co1">선택완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectQuestionFilterModal;