import React from "react";

const ProjectPersonFilterModal = ({
                                      handleModalFilterClose1,
                                      showFilterModal1,
                                      handleCheckAll1,
                                      checkAll,
                                      uniquePersons,
                                      handleCheckboxChangePersons,
                                      selectedLabelsPersons,
                                      handleModalFilterSubmit1
                                  }) => {

    return (
        <div onClick={handleModalFilterClose1} className={showFilterModal1? 'modal_area on' : 'modal_area off'}>
            <div className="modal_layout">
                <div className="modal">
                    <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                        <div className="modal_title_box baseline">
                            <div className="title_box">
                                <h3 className="tit">화자 필터</h3>
                                <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                            </div>
                            <button onClick={handleModalFilterClose1}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                        </div>
                        <div className="filter_check_box">
                            <div className="input_box end">

                                <label><input type="checkbox" id="filter1" onChange={handleCheckAll1} checked={checkAll}/>전체선택</label>
                            </div>
                            <>
                                {uniquePersons.map(item => (
                                    <div className="input_box">
                                        <label><input id={item} type="checkbox"
                                                      onChange={(e) => handleCheckboxChangePersons(e, item)}
                                                      checked={selectedLabelsPersons.includes(item)}/>{item}</label>
                                    </div>
                                ))}
                            </>
                        </div>
                        <div className="fixed_btn_box">
                            <button onClick={handleModalFilterClose1} type="button">취소</button>
                            <button onClick={handleModalFilterSubmit1} type="button" className="co1">선택완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPersonFilterModal;