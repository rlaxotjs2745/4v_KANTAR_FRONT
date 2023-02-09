import React, {useEffect, useState} from "react";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../../Util/env";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";

const ProjectKeywordFilterModal = ({
                                       handleModalFilterClose5,
                                       showFilterModal5,
                                       handleModalFilterSubmit5,
                                       setSelectedDictR,
                                       setDictDataR,
                                       setSelectedDictDataR,
                                       setDictAllR,
                                       setDictDataAllR,
                                       selectedDictR,
                                       dictDataR,
                                       selectedDictDataR,
                                       dictAllR,
                                       dictDataAllR,
                                       dictDataRaw,
                                       setDictDataRaw
}) => {

    const [dictionaryList, setDictionaryList] = useState([]);
    const [selectedDict, setSelectedDict] = useState(selectedDictR);
    const [dictData, setDictData] = useState(dictDataR);
    const [selectedDictData, setSelectedDictData] = useState(selectedDictDataR);
    const [dictAll, setDictAll] = useState(dictAllR);
    const [dictDataAll, setDictDataAll] = useState(dictDataAllR);
    const [rawDictData, setRawDictData] = useState(dictDataRaw);

    useEffect(() => {
        axios.get(SERVER_URL + 'dict/list_dictionary?recordCountPerPage=99999', AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    setDictionaryList(res.data.data.dictList);
                }
            })
    },[])

    useEffect(() => {
        if(selectedDict.length === 0){
            setSelectedDictData([]);
            setRawDictData([]);
            setDictData([]);
        }
    }, [selectedDict])


    const checkDict = (idx, e) => {
        if(selectedDict.filter(dt => dt.idx_dictionary === idx).length !== 0){ //체크 해제경우
            setSelectedDict(selectedDict.filter(dt => dt.idx_dictionary !== idx));
            const filterRawData = rawDictData.filter(dt => dt.idx_dictionary !== idx);
            setRawDictData(filterRawData);

            const newDD = [...new Set(filterRawData.map(d => d.keyword))];
            setDictData(newDD);
            setSelectedDictData(selectedDictData.filter(dt => newDD.includes(dt)));

            setDictAll(false);
        } else { //체크 했을경우
            const dict = dictionaryList.filter(dt => dt.idx_dictionary === idx)[0];
            setSelectedDict([...selectedDict, dict]);
            axios.get(SERVER_URL + `dict/dictionary_detail?idx_dictionary=${idx}`, AXIOS_OPTION)
                .then(res => {
                    if(res.data.success === '1'){
                        setRawDictData([...rawDictData, ...res.data.data.dictDataList]);
                        const newData = res.data.data.dictDataList.map(dt => dt.keyword);
                        setDictData([...new Set([...dictData, ...newData])]);
                    }
                });
        }
    }

    const checkDictData = (keyword) => {
        if(selectedDictData.filter(dt => dt === keyword).length !== 0){
            setSelectedDictData(selectedDictData.filter(dt => dt !== keyword));
            setDictDataAll(false);
        } else {
            const thisDictData = dictData.filter(dt => dt === keyword)[0];
            setSelectedDictData([...selectedDictData, thisDictData]);
        }
    }

    const checkAllDict = () => {
        setDictAll(!dictAll);
        if(!dictAll){
            setSelectedDict(dictionaryList);
            const idxArr = dictionaryList.map(dict => dict.idx_dictionary);

            axios.post(SERVER_URL + 'dict/get_bulk_dictionary_data', idxArr, AXIOS_OPTION)
                .then(res => {
                    if(res.data.success === '1'){
                        setRawDictData(res.data.data);
                        setDictData([...new Set(res.data.data.map(dt => dt.keyword))]);
                    }
                })
        } else {
            setSelectedDict([]);
            setDictData([]);
            setRawDictData([]);
            setSelectedDictData([]);
        }
    }

    const checkAllDictData = () => {
        setDictDataAll(!dictDataAll);
        if(!dictDataAll){
            setSelectedDictData([...dictData]);
        } else {
            setSelectedDictData([]);
        }
    }

    const submitKeyword = () => {
        setSelectedDictR(selectedDict);
        setDictDataR(dictData);
        setSelectedDictDataR(selectedDictData);
        setDictAllR(dictAll);
        setDictDataAllR(dictDataAll);
        setDictDataRaw(rawDictData);
        handleModalFilterSubmit5();
    }

    useEffect(()=>{
        setSelectedDictDataR(selectedDictData);
    },[selectedDictData])


    return (
        <div onClick={handleModalFilterClose5} className={showFilterModal5? 'modal_area on' : 'modal_area off'}>
            <div className="modal_layout">
                <div className="modal"  >
                    <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                        <div className="modal_title_box baseline">
                            <div className="title_box">
                                <h3 className="tit">키워드 필터</h3>
                                <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                            </div>
                            <button onClick={handleModalFilterClose5}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                        </div>
                        <div className="keyword_filter_area">
                            <div className="keyword_filter_box">
                                <strong className="tit">사용할 사전 선택</strong>
                                <p className="info">선택한 사전의 대표 키워드들로 묶인 상태로 키워드가 포함/제외 필터에 노출됩니다.</p>
                                <div className="keyword_check_box type2">
                                    <div className="all_chk_box">
                                        <input id="dict" type="checkbox" onChange={checkAllDict} checked={dictAll}/>
                                        <label htmlFor="dict">전체선택</label>
                                    </div>
                                    <div className="checklist_box">
                                    {
                                        dictionaryList.map(dict => {
                                            return (
                                                <div key={dict.idx_dictionary} className="check_box_list">
                                                    <div className="input_box">
                                                        <input id={dict.idx_dictionary}  type="checkbox" onChange={(e) => checkDict(dict.idx_dictionary, e)} checked={selectedDict.filter(dt => dt.idx_dictionary === dict.idx_dictionary).length > 0}/>
                                                        <label htmlFor={dict.idx_dictionary}>{dict.title}</label>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="keyword_filter_box">
                                <strong className="tit">적용할 키워드 선택</strong>
                                <div className="keyword_check_box">
                                    <div className="all_chk_box">
                                        <input id="dict2" type="checkbox" onChange={checkAllDictData} checked={dictDataAll}/>
                                        <label htmlFor="dict2">전체선택</label>
                                    </div>
                                    <div className="check_box_list">
                                        {
                                            dictData.map(dt => {
                                                return (
                                                    <div key={dt} className="input_box">
                                                        <input type="checkbox" onChange={() => checkDictData(dt)} checked={selectedDictData.includes(dt)} />
                                                        <label>{dt}</label>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed_btn_box">
                            <button onClick={handleModalFilterClose5} type="button">취소</button>
                            <button onClick={submitKeyword} type="button" className="co1">선택완료</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectKeywordFilterModal;