import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useCallback, useState, useRef } from 'react';
import Modal from "../Components/Cards/Modal";
import {Toggle} from "@carbon/react";

import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";
import InfiniteScroller from "../Components/Cards/InfiniteScroller";

const ProjectDetail = () => {

    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const words = [
        {
            text: 'told',
            value: 64,
        },
        {
            text: 'mistake',
            value: 11,
        },
        {
            text: 'thought',
            value: 16,
        },
        {
            text: 'bad',
            value: 17,
        },
        {
            text: 'correct',
            value: 10,
        },
        {
            text: 'day',
            value: 54,
        },
        {
            text: 'prescription',
            value: 12,
        },
        {
            text: 'time',
            value: 77,
        },
        {
            text: 'thing',
            value: 45,
        },
        {
            text: 'left',
            value: 19,
        },
        {
            text: 'pay',
            value: 13,
        },
        {
            text: 'people',
            value: 32,
        },
        {
            text: 'month',
            value: 22,
        },
        {
            text: 'again',
            value: 35,
        },
        {
            text: 'review',
            value: 24,
        },
        {
            text: 'call',
            value: 38,
        },
        {
            text: 'doctor',
            value: 70,
        },
        {
            text: 'asked',
            value: 26,
        },
        {
            text: 'finally',
            value: 14,
        },
        {
            text: 'insurance',
            value: 29,
        },
        {
            text: 'week',
            value: 41,
        },
        {
            text: 'called',
            value: 49,
        },
        {
            text: 'problem',
            value: 20,
        },
        {
            text: 'going',
            value: 59,
        },
        {
            text: 'help',
            value: 49,
        },
        {
            text: 'felt',
            value: 45,
        },
        {
            text: 'discomfort',
            value: 11,
        },
        {
            text: 'lower',
            value: 22,
        },
        {
            text: 'severe',
            value: 12,
        },
        {
            text: 'free',
            value: 38,
        },
        {
            text: 'better',
            value: 54,
        },
        {
            text: 'muscle',
            value: 14,
        },
        {
            text: 'neck',
            value: 41,
        },
        {
            text: 'root',
            value: 24,
        },
        {
            text: 'adjustment',
            value: 16,
        },
        {
            text: 'therapy',
            value: 29,
        },
        {
            text: 'injury',
            value: 20,
        },
        {
            text: 'excruciating',
            value: 10,
        },
        {
            text: 'chronic',
            value: 13,
        },
        {
            text: 'chiropractor',
            value: 35,
        },
        {
            text: 'treatment',
            value: 59,
        },
        {
            text: 'tooth',
            value: 32,
        },
        {
            text: 'chiropractic',
            value: 17,
        },
        {
            text: 'dr',
            value: 77,
        },
        {
            text: 'relief',
            value: 19,
        },
        {
            text: 'shoulder',
            value: 26,
        },
        {
            text: 'nurse',
            value: 17,
        },
        {
            text: 'room',
            value: 22,
        },
        {
            text: 'hour',
            value: 35,
        },
        {
            text: 'wait',
            value: 38,
        },
        {
            text: 'hospital',
            value: 11,
        },
        {
            text: 'eye',
            value: 13,
        },
        {
            text: 'test',
            value: 10,
        },
        {
            text: 'appointment',
            value: 49,
        },
        {
            text: 'medical',
            value: 19,
        },
        {
            text: 'question',
            value: 20,
        },
        {
            text: 'office',
            value: 64,
        },
        {
            text: 'care',
            value: 54,
        },
        {
            text: 'minute',
            value: 29,
        },
        {
            text: 'waiting',
            value: 16,
        },
        {
            text: 'patient',
            value: 59,
        },
        {
            text: 'health',
            value: 49,
        },
        {
            text: 'alternative',
            value: 24,
        },
        {
            text: 'holistic',
            value: 19,
        },
        {
            text: 'traditional',
            value: 20,
        },
        {
            text: 'symptom',
            value: 29,
        },
        {
            text: 'internal',
            value: 17,
        },
        {
            text: 'prescribed',
            value: 26,
        },
        {
            text: 'acupuncturist',
            value: 16,
        },
        {
            text: 'pain',
            value: 64,
        },
        {
            text: 'integrative',
            value: 10,
        },
        {
            text: 'herb',
            value: 13,
        },
        {
            text: 'sport',
            value: 22,
        },
        {
            text: 'physician',
            value: 41,
        },
        {
            text: 'herbal',
            value: 11,
        },
        {
            text: 'eastern',
            value: 12,
        },
        {
            text: 'chinese',
            value: 32,
        },
        {
            text: 'acupuncture',
            value: 45,
        },
        {
            text: 'prescribe',
            value: 14,
        },
        {
            text: 'medication',
            value: 38,
        },
        {
            text: 'western',
            value: 35,
        },
        {
            text: 'sure',
            value: 38,
        },
        {
            text: 'work',
            value: 64,
        },
        {
            text: 'smile',
            value: 17,
        },
        {
            text: 'teeth',
            value: 26,
        },
        {
            text: 'pair',
            value: 11,
        },
        {
            text: 'wanted',
            value: 20,
        },
        {
            text: 'frame',
            value: 13,
        },
        {
            text: 'lasik',
            value: 10,
        },
        {
            text: 'amazing',
            value: 41,
        },
        {
            text: 'fit',
            value: 14,
        },
        {
            text: 'happy',
            value: 22,
        },
        {
            text: 'feel',
            value: 49,
        },
        {
            text: 'glasse',
            value: 19,
        },
        {
            text: 'vision',
            value: 12,
        },
        {
            text: 'pressure',
            value: 16,
        },
        {
            text: 'find',
            value: 29,
        },
        {
            text: 'experience',
            value: 59,
        },
        {
            text: 'year',
            value: 70,
        },
        {
            text: 'massage',
            value: 35,
        },
        {
            text: 'best',
            value: 54,
        },
        {
            text: 'mouth',
            value: 20,
        },
        {
            text: 'staff',
            value: 64,
        },
        {
            text: 'gum',
            value: 10,
        },
        {
            text: 'chair',
            value: 12,
        },
        {
            text: 'ray',
            value: 22,
        },
        {
            text: 'dentistry',
            value: 11,
        },
        {
            text: 'canal',
            value: 13,
        },
        {
            text: 'procedure',
            value: 32,
        },
        {
            text: 'filling',
            value: 26,
        },
        {
            text: 'gentle',
            value: 19,
        },
        {
            text: 'cavity',
            value: 17,
        },
        {
            text: 'crown',
            value: 14,
        },
        {
            text: 'cleaning',
            value: 38,
        },
        {
            text: 'hygienist',
            value: 24,
        },
        {
            text: 'dental',
            value: 59,
        },
        {
            text: 'charge',
            value: 24,
        },
        {
            text: 'cost',
            value: 29,
        },
        {
            text: 'charged',
            value: 13,
        },
        {
            text: 'spent',
            value: 17,
        },
        {
            text: 'paying',
            value: 14,
        },
        {
            text: 'pocket',
            value: 12,
        },
        {
            text: 'dollar',
            value: 11,
        },
        {
            text: 'business',
            value: 32,
        },
        {
            text: 'refund',
            value: 10,
        },
    ]

    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [5, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };

    const { pathname } = useLocation();
    const navigate = useNavigate()
    const pathSplit = Number(pathname.split('/')[2])

    const [projectDetailList, setProjectDetailList] = useState([])

    useEffect(() => {
        const handleClick = (event) => {
            const topElement = document.querySelector('.btn_select');
            const contentElement = document.querySelector('.filter_preset');
            if (!event.target.closest('.filter_preset') && !event.target.closest('.btn_select')) {
                console.log('Click outside');
                topElement.classList.remove('on');
                contentElement.classList.remove('on');
            }
        };
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };

    }, []);

    useEffect(()=> {
        axios.post(SERVER_URL + 'project/project_view', {"idx_project" : pathSplit}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setProjectDetailList(res.data.data)
            } else {
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '')
        })
    },[])

    console.log(projectDetailList, '프로젝트 디테일 리스트')

    function toggleClass() {
        const topElement = document.querySelector('.btn_select');
        const contentElement = document.querySelector('.filter_preset');
        topElement.classList.toggle('on');
        contentElement.classList.toggle('on');
    }



    const [showModal, setShowModal] = useState(false); // 프리셋 만들기
    const [showModal2, setShowModal2] = useState(false); // 리포트 생성
    const [showModal3, setShowModal3] = useState(false); // 화자, 챕터, 서브챕터, 질문 공통 필터 모달 생성
    const [showModal4, setShowModal4] = useState(false); // 워드 클라우드 생성 모달
    const [showModal5, setShowModal5] = useState(false); // 워드 클라우드 상세페이지 모달


    const [input, setInput] = useState({ value: '', characters: 0 }); // 리포트 생성 리포트 이름 0/50 글자 개수제한
    const [input2, setInput2] = useState({ value: '', characters: 0 }); // 워드 클라우드 이름 0/20 글자 개수제한

    const [filterTitle, setFilterTitle] = useState('');

    function handleChange(setInputNumber, event) { // 리포트 생성 리포트 이름 0/50 글자 개수제한
        setInputNumber({ value: event.target.value, characters: event.target.value.length });
    }

    // 필터 프리셋 만들기
    const handleButtonClick = () => {
        setShowModal(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose = () => {
        setShowModal(false);
        document.body.classList.remove('fixed');
    };

    // 리포트 생성
    const handleButtonClick2 = () => {
        setShowModal2(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose2 = () => {
        setShowModal2(false);
        document.body.classList.remove('fixed');
    };

    // 화자, 챕터, 서브챕터, 질문 공통 필터 모달 생성
    const handleButtonClick3 = (newValue) => {
        setFilterTitle(newValue);
        setShowModal3(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose3 = () => {
        setShowModal3(false);
        document.body.classList.remove('fixed');
    };

    // 워드 클라우드 생성 모달
    const handleButtonClick4 = (newValue) => {
        setShowModal4(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose4 = () => {
        setShowModal4(false);
        document.body.classList.remove('fixed');
    };

    // 워드 클라우드 상세페이지 모달
    const handleButtonClick5 = (newValue) => {
        setShowModal5(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose5 = () => {
        setShowModal5(false);
        document.body.classList.remove('fixed');
    };


    return(
        <>
            <div className="page">
                <form>
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/')}>
                                <img src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>SL00001_PJ002_chat-hitories13_김설문</h2>
                        </div>
                        <div className="title_section pd0">
                            <div className="title_box">
                                <h3 className="title">Raw Data</h3>
                                <p className="info">위 필터를 설정해 리포트를 생성할 수 있습니다.</p>
                            </div>
                            <div className="btn_box">
                                <button onClick={handleButtonClick4} type="button" className="cds--btn cds--btn--tertiary">워드 클라우드 열기</button>
                                <a href="#none" download className="download cds--btn cds--btn--tertiary">데이터 다운로드</a>
                                <button onClick={handleButtonClick2} type="button" className="plus cds--btn">리포트 생성</button>
                            </div>
                        </div>
                    </div>
                    <div className="project_detail_area">
                        <div className="filter_btn_box">
                            <button onClick={() => handleButtonClick3('화자')} type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>화자<span className="count">2</span></button>
                            <button onClick={() => handleButtonClick3('챕터')}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>챕터</button>
                            <button onClick={() => handleButtonClick3('서브챕터')}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>서브챕터<span className="count">2</span></button>
                            <button onClick={() => handleButtonClick3('질문')}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>질문<span className="count">2</span></button>
                            <button  onClick={() => handleButtonClick3('키워드')} type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>키워드</button>
                            <button type="button" className="refresh"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh_blue.svg'}/></button>
                            <div className="btn_select_box">
                                <button type="button" onClick={toggleClass} className="btn_select">필터값 저장 / 불러오기</button>
                                <div className="filter_preset" >
                                    <strong className="tit">필터 프리셋</strong>
                                    <p className="info">필터값을 프리셋으로 저장하여 사용할 수 있습니다.</p>
                                    <div className="filter_chk_box">
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk1"/><label htmlFor="chk1">프리셋 01</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk2"/><label htmlFor="chk2">프리셋 02</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk3"/><label htmlFor="chk3">프리셋 03</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk4"/><label htmlFor="chk4">프리셋 04</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk5"/><label htmlFor="chk5">프리셋 05</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk6"/><label htmlFor="chk6">프리셋 06</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk7"/><label htmlFor="chk7">프리셋 07</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                        <div className="input_box">
                                            <div className="checkbox"><input type="checkbox" id="chk8"/><label htmlFor="chk8">프리셋 08</label></div>
                                            <button type="button" className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                        </div>
                                    </div>
                                    <div className="btn_box">
                                        <button type="button" onClick={handleButtonClick}>프리셋 만들기</button>
                                        <button type="button">불러오기</button>
                                    </div>
                                </div>
                            </div>
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
                            </colgroup>
                            <thead>
                            <tr>
                                <th>화자</th>
                                <th>챕터</th>
                                <th>서브챕터</th>
                                <th>질문</th>
                                <th>내용</th>
                            </tr>
                            </thead>
                            <tbody>

                            {!projectDetailList || !projectDetailList.length ?
                                <td colSpan="5" style={{textAlign:'center'}}>리스트가 없습니다.</td>
                             :
                                <InfiniteScroller
                                    items={projectDetailList}
                                />
                            }
                            </tbody>
                        </table>

                    </div>
                </form>
            </div>

            {/* 새 필터 프리셋 모달 */}
            {showModal && (
                <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose}>
                    <div className="modal_title_box">
                        <h3 className="tit">새 필터 프리셋</h3>
                        <button onClick={handleModalClose}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <div className="search_section">
                        <strong className="sub_tit">새 필터 프리셋 이름</strong>
                        <div className="input_box">
                            <input type="text" placeholder="프리셋 이름을 입력해주세요.."/>
                            <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                        </div>
                    </div>
                    <div className="fixed_btn_box">
                        <button onClick={handleModalClose} type="button">취소</button>
                        <button type="button" className="co1">생성하기</button>
                    </div>
                </Modal>
            )}

            {/* 리포트 생성 모달 */}
            {showModal2 && (
                <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose2}>
                    <div className="modal_title_box">
                        <h3 className="tit">리포트 생성</h3>
                        <button onClick={handleModalClose2}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>
                    <div className="input_text_area">
                        <div className="flex">
                            <div className="input_box">
                                <label htmlFor="project_name required"><em className="title required">프로젝트 이름</em><span>{input.characters}/50</span></label>
                                <input onChange={(event) => handleChange(setInput, event)} type="text" id="project_name" maxLength="50"/>
                            </div>
                        </div>
                    </div>
                    <div className="toggle_check_box">
                        <div className="left">
                            <strong className="tit">[요약할 영역을 선택해주세요.]</strong>
                            <Toggle
                                size="sm"
                                labelText=''
                                labelA="전체 요약을 포함 할까요?"
                                labelB="전체 요약을 포함 할까요?"
                                defaultToggled={false}
                                id="toggle-1"
                            />
                            <Toggle
                                size="sm"
                                labelText=''
                                labelA="챕터별 요약을 포함 할까요? (기본값 *)"
                                labelB="챕터별 요약을 포함 할까요? (기본값 *)"
                                defaultToggled={false}
                                id="toggle-2"
                            />
                            <Toggle
                                size="sm"
                                labelText=''
                                labelA="서브 챕터별 요약을 포함 할까요?"
                                labelB="서브 챕터별 요약을 포함 할까요?"
                                defaultToggled={false}
                                id="toggle-3"
                            />
                            <Toggle
                                size="sm"
                                labelText=''
                                labelA="질문별 요약을 포함 할까요?"
                                labelB="질문별 요약을 포함 할까요?"
                                defaultToggled={false}
                                id="toggle-4"
                            />
                        </div>
                        <div className="right">
                            <strong className="tit">[추가 옵션을 선택해 주세요.]</strong>
                            <Toggle
                                size="sm"
                                labelText=''
                                labelA="키워드 추출시 한 글자는 제외 하겠습니까?"
                                labelB="키워드 추출시 한 글자는 제외 하겠습니까?"
                                defaultToggled={false}
                                id="toggle-5"
                            />
                            <div className="label_box">
                                <div className="left">
                                    <span>키워드 품사 형태를 선택하여 보겠습니까?</span>
                                </div>
                                <div className="right">
                                    <div className="input_box"><input id="chk11" type="checkbox"/><label htmlFor="chk11">명사</label></div>
                                    <div className="input_box"><input id="chk22" type="checkbox"/><label htmlFor="chk22">형용사</label></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="fixed_btn_box">
                        <p className="tip">* 항목들은 선택된 필터에 따라 활성화 혹은 비활성화 될 수 있습니다.</p>
                        <button onClick={handleModalClose2} type="button">취소</button>
                        <button type="button" className="co1">생성하기</button>
                    </div>

                </Modal>
            )}


            {/*화자, 챕터, 서브챕터, 질문 공통 필터 + 키워드 필터 모달 */}
            {showModal3 && (
                <Modal in_fixed_btn="in_fixed_btn" onClose={handleModalClose3}>
                    <div className="modal_title_box baseline">
                        <div className="title_box">
                            <h3 className="tit">{filterTitle} 필터</h3>
                            {
                                filterTitle === '키워드' ? null
                                    :
                                    <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                            }
                        </div>
                        <button onClick={handleModalClose3}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                    </div>

                    {
                        filterTitle === '키워드' ?
                            <div className="keyword_filter_area">
                                <div className="keyword_filter_box">
                                    <strong className="tit">사용할 사전 선택</strong>
                                    <p className="info">선택한 사전의 대표 키워드들로 묶인 상태로 키워드가 포함/제외 필터에 노출됩니다.</p>
                                    <div className="keyword_check_box type2">
                                        <div className="all_chk_box">
                                            <input type="checkbox"/>
                                            <label>전체선택</label>
                                        </div>
                                        <div className="check_box_list">
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 A</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 B</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 C</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 D</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 E</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 F</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 G</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 Q</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 H</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 I</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 J</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 K</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 L</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 M</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>사전 O</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="keyword_filter_box">
                                    <strong className="tit">적용할 키워드 선택</strong>
                                    <div className="keyword_check_box">
                                        <div className="all_chk_box">
                                            <input type="checkbox"/>
                                            <label>전체선택</label>
                                        </div>
                                        <div className="check_box_list">
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                            <div className="input_box">
                                                <input type="checkbox"/>
                                                <label>keyword</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="filter_check_box">
                                <div className="input_box end">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">전체선택</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                                <div className="input_box">
                                    <input type="checkbox" id="filter1"/>
                                    <label htmlFor="filter1">Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01_Chapter 01</label>
                                </div>
                            </div>
                    }

                    <div className="fixed_btn_box">
                        <button onClick={handleModalClose3} type="button">취소</button>
                        <button type="button" className="co1">선택완료</button>
                    </div>

                </Modal>
            )}

            {/* 워드 클라우드 생성 모달 */}
            {showModal4 && (
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
                            <button type="button" className="plus cds--btn">생성하기</button>
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
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    <tr>
                                        <td>워드클라우드A01</td>
                                        <td>
                                            <button className="hover_count" type="type">화자 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">서브챕터 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">질문 <span className="count">2</span></button>
                                            <button className="hover_count" type="type">키워드</button>
                                        </td>
                                        <td>2022.10.21 16:33</td>
                                        <td><button onClick={handleButtonClick5} type="button">상세보기</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="table_pagination">
                                    <span className="page_num">Page 1</span>
                                    <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_left.svg'}/></button>
                                    <button type="button" className="left"><img src={process.env.PUBLIC_URL + '/assets/image/ico_pagi_right.svg'}/></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal>
            )}

            {/* 워드 클라우드 상세 모달 */}
            {showModal5 && (
                <div className="word_cloud_detail">
                    <div className="file_upload_area">
                        <div className="head type2">
                            <h2>워드클라우드A02</h2>
                            <button onClick={handleModalClose5}>
                                <img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete.svg'}/>
                            </button>
                        </div>
                    </div>
                    <div className="word_cloud_detail_content report_detail_area">
                        <div className="input_box">
                            <label htmlFor="detail_filter">적용된 필터값</label>
                            <div className="filter_area">
                                <div className="filter_box">
                                    <strong className="tit">화자</strong>
                                    <span className="keyword">화자 A</span>
                                    <span className="keyword">화자 D</span>
                                    <span className="keyword">화자 E</span>
                                </div>
                                <div className="flex">
                                    <div className="filter_box">
                                        <strong className="tit">챕터</strong>
                                        <span className="keyword">챕터 A</span>
                                        <span className="keyword">챕터 C</span>
                                        <span className="keyword">챕터 R</span>
                                    </div>
                                    <div className="filter_box">
                                        <strong className="tit">서브챕터</strong>
                                        <span className="keyword">서브챕터 A-1</span>
                                        <span className="keyword">서브챕터 C-1</span>
                                    </div>
                                </div>
                                <div className="filter_box">
                                    <strong className="tit">질문</strong>
                                    <span className="keyword">질문 A-1-1</span>
                                    <span className="keyword">질문 A-1-2</span>
                                </div>
                                <div className="filter_box">
                                    <strong className="tit">키워드</strong>
                                    <span className="keyword">키워드 01</span>
                                    <span className="keyword">키워드 02</span>
                                    <span className="keyword">키워드 03</span>
                                    <span className="keyword">키워드 04</span>
                                    <span className="keyword">키워드 05</span>
                                </div>
                            </div>
                        </div>
                        <div className="word_cloud_img_box">
                            <ReactWordcloud options={options} words={words} />
                        </div>
                        <div className="btn_box">
                            <a className="no_ico cds--btn" href="#none" download>이미지 다운로드</a>
                        </div>
                    </div>

                </div>
            )}
        </>
    )

}

export default ProjectDetail;