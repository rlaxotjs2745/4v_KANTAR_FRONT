import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DictionaryEntity from "../Components/Cards/DictionaryEntity";
import axios from "axios";
import {AXIOS_OPTION, SERVER_DICT_URL, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";

const Dictionary = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const idx_user = 1;
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        getListDictionary(currentPage);
    }, [currentPage]);

    const getListDictionary = (curPage) => {
        axios.get(SERVER_DICT_URL + `list_dictionary?idx_user=${idx_user}&currentPage=${curPage}`, AXIOS_OPTION)
            .then(res => {
                if(res.data.success == '1'){
                    if(res.data.data.length === 0){
                        setCurrentPage(currentPage - 1);
                        return toastNoticeInfo('마지막 페이지입니다.', '');
                    }
                    setTableData(res.data.data);
                }
            })
    }


    const movePage = (type) => {
        if(currentPage == 0 && type === 0){
            return toastNoticeInfo('첫 페이지입니다.', '');
        }
        setCurrentPage(type === 1 ? currentPage + 1 : currentPage - 1);
    }

    const getSearchWord = (e) => {
        setSearchWord(e.target.value);
    }

    const deleteDictionary = (idx) => {
        axios.post(SERVER_DICT_URL + 'delete_dictionary', {idx_dictionary: idx}, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    toastNoticeSuccess('사전이 삭제되었습니다.', '');
                    setTableData(tableData.filter(dt => dt.idx_dictionary != idx));
                }
            })
    }


    return (
        <>
            <div className="page">
                <div className="search_section">
                    <div className="input_box">
                        <input onChange={(e) => getSearchWord(e)} type="text" placeholder="검색어를 입력하세요."/>
                        <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                    </div>
                </div>
                <div className="title_section">
                    <div className="title_box">
                        <h3 className="title">사전 관리</h3>
                        <p className="info">사전을 생성하고 단어를 매칭시킬 수 있습니다.</p>
                    </div>
                    <div className="btn_box">
                        <Link to="/dictionary_create" className="no_ico cds--btn">사전 생성하기</Link>
                    </div>
                </div>

                <div className="table_area">
                    <table className="table_type1">
                        <colgroup>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th>번호</th>
                            <th>사전이름</th>
                            <th>속성</th>
                            <th>표제어 수</th>
                            <th>등록일</th>
                            <th style={{textAlign:"center"}}>관리</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tableData.map(dt => <DictionaryEntity key={dt.idx_dictionary} deleteDictionary={deleteDictionary} entity={dt} />)
                        }
                        </tbody>
                    </table>
                    <div className="table_pagination">
                        <span className="page_num">Page {currentPage + 1}</span>
                        <button onClick={() => movePage(0)} className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                        <button onClick={() => movePage(1)} className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dictionary;