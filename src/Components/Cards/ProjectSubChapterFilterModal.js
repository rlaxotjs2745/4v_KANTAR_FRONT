import React from "react";

const ProjectSubChapterFilterModal = ({
                                          handleModalFilterClose3,
                                          showFilterModal3,
                                          handleCheckAll3,
                                          checkAll3,
                                          uniqueSubchapters,
                                          selectedLabelsSubchapters,
                                          handleCheckboxChangeSubchapters,
                                          handleModalFilterSubmit3
                                      }) => {

    return (
        <div onClick={handleModalFilterClose3} className={showFilterModal3? 'modal_area on' : 'modal_area off'}>
            <div className="modal_layout">
                <div className="modal"  >
                    <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                        <div className="modal_title_box baseline">
                            <div className="title_box">
                                <h3 className="tit">서브챕터 필터</h3>
                                <p className="info">선택한 서브챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                            </div>
                            <button onClick={handleModalFilterClose3}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                        </div>
                        <div className="filter_check_box">
                            <div className="input_box end">
                                <label><input type="checkbox" id="filter3" onChange={handleCheckAll3} checked={checkAll3}/>전체선택</label>
                            </div>
                            <>
                                {uniqueSubchapters.map(item => (
                                    <div className="input_box">
                                        <label><input id={item} type="checkbox" onChange={(e) => handleCheckboxChangeSubchapters(e, item)} checked={selectedLabelsSubchapters.includes(item)}/>{item}</label>
                                    </div>
                                ))}
                            </>
                        </div>
                        <div className="fixed_btn_box">
                            <button onClick={handleModalFilterClose3} type="button">취소</button>
                            <button onClick={handleModalFilterSubmit3} type="button" className="co1">선택완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectSubChapterFilterModal;