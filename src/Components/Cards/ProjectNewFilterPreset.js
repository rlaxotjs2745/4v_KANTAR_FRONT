import Modal from "./Modal";
import React from "react";

const ProjectNewFilterPreset = ({
                                    handleModalClose,
                                    handleFilterTitle,
                                    CreateFilterPreset

                                }) => {
    return (
        <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose}>
            <div className="modal_title_box">
                <h3 className="tit">새 필터 프리셋</h3>
                <button onClick={handleModalClose}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
            </div>
            <div className="search_section">
                <strong className="sub_tit">새 필터 프리셋 이름</strong>
                <div className="input_box">
                    <input type="text" placeholder="프리셋 이름을 입력해주세요.." name="filter_title" onChange={handleFilterTitle} />
                    <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                </div>
            </div>
            <div className="fixed_btn_box">
                <button onClick={handleModalClose} type="button">취소</button>
                <button type="button" onClick={CreateFilterPreset} type="button" className="co1">생성하기</button>
            </div>
        </Modal>
    )
}

export default ProjectNewFilterPreset;