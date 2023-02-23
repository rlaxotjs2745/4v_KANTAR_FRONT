import Modal from "./Modal";
import React from "react";

const ProjectCreateWordCloudModal = ({
                                         handleModalClose4,
                                         input2,
                                         handleChange,
                                         setInput2,
                                         handleButtonClick5,
                                         wordcloudDataList,
                                         createWordCloud,
                                         handleRightClick,
                                         handleLeftClick,
                                         currentPageNumber
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
                    <button onClick={createWordCloud} type="button" className="plus cds--btn">생성하기</button>
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
                            {wordcloudDataList && wordcloudDataList.tcnt > 0 ?
                                wordcloudDataList.list.map(item => (
                                        <tr id={item.idx}>
                                            <td>{item.filter_title}</td>
                                            <td>
                                                <div className="word_filter_list_area">
                                                    {item.filterDataList.map(item=>(
                                                      <>
                                                          <div className="word_filter_list_box">
                                                              <div className="hover_count">
                                                                  {item.filter_type === 1 ? '화자' :
                                                                      item.filter_type === 2 ? '챕터' :
                                                                          item.filter_type === 3 ? '서브챕터' :
                                                                              item.filter_type === 4 ? '질문' :
                                                                                  item.filter_type === 5 ? '키워드' : null
                                                                  }
                                                                  <span className="count">{item.filterDataArray && item.filterDataArray.length}</span>
                                                              </div>
                                                              <div className="hover_view">
                                                                  <strong className="tit">
                                                                      {item.filter_type === 1 ? '화자' :
                                                                          item.filter_type === 2 ? '챕터' :
                                                                              item.filter_type === 3 ? '서브챕터' :
                                                                                  item.filter_type === 4 ? '질문' :
                                                                                      item.filter_type === 5 ? '키워드' : null
                                                                      }
                                                                  </strong>
                                                                  <div className="hover_circle_box">
                                                                      {item.filterDataArray.map(item => (
                                                                          <>
                                                                              <span className="circle">{item.filter_data}</span>
                                                                          </>
                                                                      ))}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>{item.create_dt}</td>
                                            <td>
                                                <button onClick={handleButtonClick5} type="button">상세보기</button>
                                            </td>
                                        </tr>
                                    ))
                                :
                                <tr>
                                    <td colSpan="4" style={{textAlign:"center"}}>리스트가 없습니다.</td>
                                </tr>
                            }

                            </tbody>
                        </table>
                        <div className="table_pagination">
                            <span className="page_num">Page {currentPageNumber}</span>
                            <button onClick={handleLeftClick} type="button" className="left"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                            <button onClick={handleRightClick} type="button" className="left"><img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                        </div>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default ProjectCreateWordCloudModal;