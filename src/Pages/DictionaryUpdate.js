import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useToastAlert} from "../Util/toastAlert";

const DictionaryUpdate = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();


    const navigate = useNavigate()

    const dictionarySave = () => { // 프로젝트 저장 버튼

        // const form = document.querySelector('#fileUploadForm');


        // if (form.job_no.value === '') {
        //     return (toastNoticeError('필수 정보가 입력되지 않았습니다.', ''))
        // }



        toastNoticeInfo('사전이 저장되었습니다.', '')
    }

    return(
        <>
            <div className="page">
                <div className="file_upload_area">
                    <div className="head">
                        <button onClick={() => navigate('/dictionary')}>
                            <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                        </button>
                        <h2>사전 수정하기</h2>
                    </div>
                    <div className="title_section pd0">
                        <div className="title_box">
                            <h3 className="title">브랜드_종합01</h3>
                        </div>
                        <div className="btn_box">
                            <button onClick={dictionarySave} type="button" className="no_ico cds--btn">사전 저장</button>
                            <a className="download2 cds--btn" href="/dictionary_create">사전 다운로드</a>
                        </div>
                    </div>
                </div>
                <div className="table_area">
                    <table className="table_type1 type2">
                        <colgroup>
                            <col width="auto"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                            <col width="8.5%"/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>대표 키워드</th>
                            <th>키워드01</th>
                            <th>키워드02</th>
                            <th>키워드03</th>
                            <th>키워드04</th>
                            <th>키워드05</th>
                            <th>키워드06</th>
                            <th>키워드07</th>
                            <th>키워드08</th>
                            <th>키워드09</th>
                            <th>키워드10</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>현대백화점</td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드01"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드02"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드04"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드05"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드07"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드09"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td className="absolute">
                                <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_delete.svg'}/></button>
                                <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_add.svg'}/></button>
                            </td>
                        </tr>
                        <tr>
                            <td>현대백화점</td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드04"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드06"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드08"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드09"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td className="absolute">
                                <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_delete.svg'}/></button>
                            </td>
                        </tr>
                        <tr>
                            <td>현대백화점</td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드02"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드05"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드08"/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue=""/></td>
                            <td><input type="text" placeholder="단어입력" defaultValue="키워드10"/></td>
                            <td className="absolute">
                                <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_delete.svg'}/></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default DictionaryUpdate;