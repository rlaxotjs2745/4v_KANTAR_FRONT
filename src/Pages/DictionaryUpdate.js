import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useToastAlert} from "../Util/toastAlert";
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import DictionaryUpdateEntity from "../Components/Cards/DictionaryUpdateEntity";


const DictionaryUpdate = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();
    const navigate = useNavigate();

    const [dictionaryIdx, setDictionaryIdx] = useState(window.location.pathname.split('/').reverse()[0]);
    const [dictionaryTitle, setDictionaryTitle] = useState('');
    const [dictionaryData, setDictionaryData] = useState([]);
    const [loadingBool, setLoadingBool] = useState(false);
    const idx_user = 1; // 토큰 처리 방법 및 idx 값을 구할 수 있는 방법이 생기면 수정 예정

    useEffect(() => {
        getDictionaryData();
    }, [])

    const getDictionaryData = () => {
        axios.get(SERVER_URL + `dict/dictionary_detail?idx_dictionary=${dictionaryIdx}`, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === '1'){
                    setDictionaryTitle(res.data.data.title);
                    setDictionaryData(res.data.data.dictDataList);
                } else {
                    toastNoticeError(res.data.msg, '');
                }
            });
    }

    const dictionarySave = () => { // 프로젝트 저장 버튼
        if(loadingBool){
            return;
        }
        setLoadingBool(true);
        axios.post(SERVER_URL + 'dict/update_dictionary_data', dictionaryData, AXIOS_OPTION)
            .then(res => {
                if(res.data.success === "1"){
                    toastNoticeInfo('사전이 저장되었습니다.', '');
                    navigate('/dictionary');
                } else {
                    toastNoticeError(res.data.msg, '');
                }
            })
        setLoadingBool(false);
    }

    const deleteDictionaryData = (idx) => {
        if(!!idx){
            if(loadingBool){
                return;
            }
            setLoadingBool(true);
            axios.post(SERVER_URL + 'dict/delete_dictionary_data', {idx_dictionary_data: idx}, AXIOS_OPTION)
                .then(res => {
                    if(res.data.success === '1'){
                        toastNoticeSuccess('대표 키워드 삭제가 완료되었습니다.', '');
                        setDictionaryData(dictionaryData.filter(dt => dt.idx_dictionary_data != idx));
                    } else {
                        toastNoticeError(res.data.msg, '');
                    }
                })
            setLoadingBool(false);
        } else {
            setDictionaryData(dictionaryData.slice(1));
        }
    }

    const addDictionaryData = () => {
        if(dictionaryData[0].idx_dictionary_data == null && dictionaryData[0].keyword == ''){
            return;
        }

        setDictionaryData([{
            idx_dictionary: parseInt(dictionaryIdx),
            keyword: '',
            keyword01:'',
            keyword02:'',
            keyword03:'',
            keyword04:'',
            keyword05:'',
            keyword06:'',
            keyword07:'',
            keyword08:'',
            keyword09:'',
            keyword10:'',
            idx_user: idx_user
        }, ...dictionaryData]);
    }

    const updateDictionaryData = (idx, e) => {
        let thisIdx = 0;
        if(idx){
            for(let i = 0; i < dictionaryData.length; i++){
                if(dictionaryData[i].idx_dictionary_data == idx){
                    thisIdx = i;
                }
            }
        }
        const headArr = dictionaryData.slice(0, thisIdx);
        const tailArr = dictionaryData.slice(thisIdx+1);
        let thisDictionaryData = dictionaryData[thisIdx];
        thisDictionaryData[e.target.className.split('_').reverse()[0]] = e.target.value;
        thisDictionaryData.filter = 1;

        setDictionaryData([...headArr, thisDictionaryData, ...tailArr]);
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
                            <h3 className="title">{dictionaryTitle}</h3>
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
                        {
                            dictionaryData && dictionaryData.length > 0 ?
                                dictionaryData.map((dt,idx) => {
                                    return idx === 0 ?
                                    <DictionaryUpdateEntity key={dt.idx_dictionary_data} entity={dt} deleteData={deleteDictionaryData} updateData={updateDictionaryData} newData={addDictionaryData} isFirst={true}/>
                                        :
                                    <DictionaryUpdateEntity key={dt.idx_dictionary_data} entity={dt} deleteData={deleteDictionaryData} updateData={updateDictionaryData} newData={addDictionaryData} isFirst={false}/>
                                }) : null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default DictionaryUpdate;