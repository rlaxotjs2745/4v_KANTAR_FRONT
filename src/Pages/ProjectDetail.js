import React, {useEffect, useRef} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useCallback, useState } from 'react';
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
    const [projectDetailListOrigin, setProjectDetailListOrigin] = useState([])
    const [projectDetailListFilterOrigin, setProjectDetailListFilterOrigin] = useState([]) // 화자랑 챕터에서 고른 후에 있는 서브챕터 리스트 원본용
    const [projectDetailListFilterOrigin2, setProjectDetailListFilterOrigin2] = useState([]) // 화자랑 챕터에서 고른 후에 있는 질문 리스트 원본용

    const [showModal, setShowModal] = useState(false); // 프리셋 만들기
    const [showModal2, setShowModal2] = useState(false); // 리포트 생성
    const [showModal3, setShowModal3] = useState(false); // 화자, 챕터, 서브챕터, 질문 공통 필터 모달 생성
    const [showModal4, setShowModal4] = useState(false); // 워드 클라우드 생성 모달
    const [showModal5, setShowModal5] = useState(false); // 워드 클라우드 상세페이지 모달

    const [showFilterModal1, setShowFilterModal1] = useState(false) // 화자 모달
    const [showFilterModal2, setShowFilterModal2] = useState(false) // 챕터 모달
    const [showFilterModal3, setShowFilterModal3] = useState(false) // 서브챕터 모달
    const [showFilterModal4, setShowFilterModal4] = useState(false) // 질문 모달
    const [showFilterModal5, setShowFilterModal5] = useState(false) // 키워드 모달

    const [filterPresetList, setFilterPresetList] = useState([])

    useEffect(() => {
        const handleClick = (event) => {
            const topElement = document.querySelector('.btn_select');
            const contentElement = document.querySelector('.filter_preset');
            if (!event.target.closest('.filter_preset') && !event.target.closest('.btn_select')) {
                // console.log('Click outside');
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
                setProjectDetailListOrigin(res.data.data)
            } else {
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })


    },[])

    useEffect(()=>{
        axios.post(SERVER_URL + 'filter/get', {"idx_project_job_projectid" : pathSplit, "idx_filter" : null}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setFilterPresetList(res.data.data)
                // console.log(res.data.data, '서버에서 오는 원본 필터 정보')
            } else {
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })
    },[showModal])

    function toggleClass() {
        const topElement = document.querySelector('.btn_select');
        const contentElement = document.querySelector('.filter_preset');
        topElement.classList.toggle('on');
        contentElement.classList.toggle('on');
    }

    // 화자 필터 모달 관련 시작
    const handleModalFilter1 = () => {
        setShowFilterModal1(true)
        setPersonsFilterModalOrigin([...selectedLabelsPersons])
        document.body.classList.add('fixed');
    };
    const handleModalFilterClose1 = () => {
        setShowFilterModal1(false)
        setSelectedLabelsPersons([...personsFilterModalOrigin])
        document.body.classList.remove('fixed');
    };

    const handleCheckAll1 = (e) => {
        setCheckAll(e.target.checked);
        if(e.target.checked) {
            setSelectedLabelsPersons(persons);
        } else {
            setSelectedLabelsPersons([]);
        }
    }

    const handleModalFilterSubmit1 = () => {
        // console.log(selectedLabelsPersons, '선택된 값')
        if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            // console.log('질문 선택')
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            // console.log('서브챕터 선택')
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount2 > 0){
            // console.log('챕터 선택')
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else {
            // console.log('화자만 선택')
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        }

        setShowFilterModal1(false)
    }
    // 화자 필터 모달 관련 끝


    // 챕터 필터 모달 시작
    const handleModalFilter2 = () => {
        setShowFilterModal2(true)
        setChaptersFilterModalOrigin([...selectedLabelsChapters])
        document.body.classList.add('fixed');
    };

    const handleModalFilterClose2 = () => {
        setShowFilterModal2(false)
        setSelectedLabelsChapters([...chaptersFilterModalOrigin])
        document.body.classList.remove('fixed');
    };

    const handleCheckAll2 = (e) => {
        setCheckAll2(e.target.checked);
        if(e.target.checked) {
            setSelectedLabelsChapters(chapters);
        } else {
            setSelectedLabelsChapters([]);
        }
    }

    const handleModalFilterSubmit2 = () => {
        setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        setShowFilterModal2(false)
    }
    // 챕터 필터 모달 끝

    // 서브챕터 필터 모달 시작
    const handleModalFilter3 = () => {
        if(projectDetailListFilterOrigin.length) {
            setShowFilterModal3(true)
            setSubchaptersFilterModalOrigin([...selectedLabelsSubchapters])
            document.body.classList.add('fixed');
        } else {
            toastNoticeWarning('챕터를 먼저 선택해주세요.')
        }

    };

    const handleModalFilterClose3 = () => {
        setShowFilterModal3(false)
        setSelectedLabelsSubchapters([...subchaptersFilterModalOrigin])
        document.body.classList.remove('fixed');
    };

    const handleCheckAll3 = (e) => {
        setCheckAll3(e.target.checked);
        if(e.target.checked) {
            setSelectedLabelsSubchapters(subchapters);
        } else {
            setSelectedLabelsSubchapters([]);
        }
    }

    const handleModalFilterSubmit3 = () => {
        setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        setShowFilterModal3(false)
    }
    // 서브챕터 필터 모달 끝




    // console.log(projectDetailListFilterOrigin2, '여기서 퀘스쳔 뽑아내야함')


    const handleModalFilter4 = () => {
        if(projectDetailListFilterOrigin2.length) {
            setShowFilterModal4(true)
            setQuestionsFilterModalOrigin([...selectedLabelsQuestions])
            document.body.classList.add('fixed');
        } else {
            toastNoticeWarning('서브챕터를 먼저 선택해주세요.')
        }

    };

    const handleModalFilterClose4 = () => {
        setShowFilterModal4(false)
        setSelectedLabelsQuestions([...questionsFilterModalOrigin])
        document.body.classList.remove('fixed');
    };

    const handleCheckAll4 = (e) => {
        setCheckAll4(e.target.checked);
        if(e.target.checked) {
            setSelectedLabelsQuestions(questions);
        } else {
            setSelectedLabelsQuestions([]);
        }
    }

    const handleModalFilterSubmit4 = () => {
        setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) ))
        setShowFilterModal4(false)
    }





    const handleModalFilter5 = () => {
        setShowFilterModal5(true)
        document.body.classList.add('fixed');
    }; // 키워드 필터 오픈

    const handleModalFilterClose5 = () => {
        setShowFilterModal5(false)
        document.body.classList.remove('fixed');
    }; // 키워드 필터 닫힘

    const handleModalFilterSubmit5 = () => {
        // 리스트 셋팅해주는 스테이트
        // setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) ))

        setShowFilterModal5(false)
    } // 키워드 필터 선택완료 버튼



    const handleFilterReset = () => {
        setProjectDetailList(projectDetailListOrigin) // 리스트 초기화

        setSelectedLabelsPersons(persons); // 화자 필터 라벨 초기화 (전체 선택되어있는 상태로)
        setSelectedLabelsChapters([]); // 챕터 필터 라벨 초기화
        setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
        setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화

        setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
        setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화

        setSelectedFilter('') // 필터프리셋 선택 해제
        toastNoticeSuccess('필터를 초기화 하였습니다.')
    }


    const [input, setInput] = useState({ value: '', characters: 0 }); // 리포트 생성 리포트 이름 0/50 글자 개수제한
    const [input2, setInput2] = useState({ value: '', characters: 0 }); // 워드 클라우드 이름 0/20 글자 개수제한

    const [filterTitle, setFilterTitle] = useState('');

    function handleChange(setInputNumber, event) { // 리포트 생성 리포트 이름 0/50 글자 개수제한
        setInputNumber({ value: event.target.value, characters: event.target.value.length });
    }

    // 필터 프리셋 만들기
    const handleButtonClick = () => {
        // if(checkBoxCount4 === 0) {
        //     return toastNoticeWarning('필터를 전부 설정해주세요.')
        // }
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

    const [persons, setPersons] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [subchapters, setSubchapters] = useState([]);
    const [questions, setQuestions] = useState([]);

    const uniquePersons = [...new Set(persons)];
    const uniqueChapters = [...new Set(chapters)];

    const uniqueSubchapters = [...new Set(subchapters)];
    const uniqueQuestions = [...new Set(questions)];

    useEffect(()=> {
        projectDetailListOrigin.forEach(item => {
            if (!persons.includes(item.person)) setPersons(prevPersons => [...prevPersons, item.person])
            if (!chapters.includes(item.chapter)) setChapters(prevChapters => [...prevChapters, item.chapter]) // 화자 필터와 챕터 필터는 언제나 서버에서 보내준 origin 데이터에서 필터 가능 하게 함
            // if (!answers.includes(item.answer)) setAnswers([...answers, item.answer])
        });
    },[projectDetailListOrigin])

    useEffect(()=> {
        const subchaptersArr = [];
        const questionsArr = [];
        projectDetailListFilterOrigin.forEach(item => {
            if (!subchaptersArr.includes(item.subchapter)) subchaptersArr.push(item.subchapter); // 서브챕터와 질문 챕터는 화자 필터와 챕터에서 선택한 하위 계층에서만 고를 수 있음.
        });

        projectDetailListFilterOrigin2.forEach(item => {
            if (!questionsArr.includes(item.question)) questionsArr.push(item.question); // 질문 챕터는 동시에 고를 수 있는 것 같으나 모달 기능에서 서브챕터를 고르고 내려와야 하기 때문에 해당 리스트에서 필터링 하게 해 놓음.
        });

        setSubchapters(subchaptersArr);
        setQuestions(questionsArr);

    }, [projectDetailList, projectDetailListFilterOrigin2, projectDetailListFilterOrigin])

    // console.log(projectDetailListOrigin, '서버에서 보내준 오리지널 데이터')
    // console.log(persons, '화자')
    // console.log(chapters, '챕터')
    // console.log(subchapters, '서브챕터')
    // console.log(questions, '질문')

    const [checkAll, setCheckAll] = useState(false);
    const [checkAll2, setCheckAll2] = useState(false);
    const [checkAll3, setCheckAll3] = useState(false);
    const [checkAll4, setCheckAll4] = useState(false);


    const [selectedLabelsPersons, setSelectedLabelsPersons] = useState([]);
    const [selectedLabelsChapters, setSelectedLabelsChapters] = useState([]);
    const [selectedLabelsSubchapters, setSelectedLabelsSubchapters] = useState([]);
    const [selectedLabelsQuestions, setSelectedLabelsQuestions] = useState([]);

    const [personsFilterModalOrigin, setPersonsFilterModalOrigin] = useState([])
    const [chaptersFilterModalOrigin, setChaptersFilterModalOrigin] = useState([])
    const [subchaptersFilterModalOrigin, setSubchaptersFilterModalOrigin] = useState([])
    const [questionsFilterModalOrigin, setQuestionsFilterModalOrigin] = useState([])

    const [checkBoxCount, setCheckBoxCount] = useState(0)
    const [checkBoxCount2, setCheckBoxCount2] = useState(0)
    const [checkBoxCount3, setCheckBoxCount3] = useState(0)
    const [checkBoxCount4, setCheckBoxCount4] = useState(0)

    const handleCheckboxChangePersons = (e, label) => {
        if (e.target.checked) {
            setSelectedLabelsPersons([...selectedLabelsPersons, label]);
        } else {
            setSelectedLabelsPersons(selectedLabelsPersons.filter(item => item !== label));
        }
    }// 화자 체크박스 선택한거 setState해주는 함수

    useEffect(() => {
        setSelectedLabelsPersons(persons);
    }, [persons]);

    // useEffect(() => {
    //     setSelectedLabelsChapters(chapters);
    // }, [chapters]);

    // useEffect(() => {
    //     setSelectedLabelsSubchapters(subchapters);
    // }, [subchapters]);
    //
    // useEffect(() => {
    //     setSelectedLabelsQuestions(questions);
    // }, [questions]);

    useEffect(()=> {
        setCheckAll(persons.every(item => selectedLabelsPersons.includes(item)))
        let checkedBoxCount = 0;
        uniquePersons.map(item => {
            if(selectedLabelsPersons.includes(item)){
                checkedBoxCount++;
            }
        });
        setCheckBoxCount(checkedBoxCount)
    },[selectedLabelsPersons]) // 체크박스 전체 선택 되어있는지 안되어있는지 ture false 반환해서 setCheckAll State 관리

    const handleCheckboxChangeChapters = (e, label) => {
        if (e.target.checked) {
            setSelectedLabelsChapters([...selectedLabelsChapters, label]);
        } else {
            setSelectedLabelsChapters(selectedLabelsChapters.filter(item => item !== label));
        }
    } // 챕터 체크박스 선택한거 setState해주는 함수




    useEffect(()=> {
        // setCheckAll2(chapters.every(item => selectedLabelsChapters.includes(item)))
        let checkedBoxCount = 0;
        uniqueChapters.map(item => {
            if(selectedLabelsChapters.includes(item)){
                checkedBoxCount++;
            }
        });
        setCheckBoxCount2(checkedBoxCount)
    },[selectedLabelsChapters])

    const handleCheckboxChangeSubchapters = (e, label) => {
        if (e.target.checked) {
            setSelectedLabelsSubchapters([...selectedLabelsSubchapters, label]);
        } else {
            setSelectedLabelsSubchapters(selectedLabelsSubchapters.filter(item => item !== label));
        }
    } // 서브챕터 체크박스 선택한거 setState해주는 함수

    useEffect(()=> {
        // setCheckAll3(subchapters.every(item => selectedLabelsSubchapters.includes(item)))
        let checkedBoxCount = 0;
        uniqueSubchapters.map(item => {
            if(selectedLabelsSubchapters.includes(item)){
                checkedBoxCount++;
            }
        });
        setCheckBoxCount3(checkedBoxCount)
    },[selectedLabelsSubchapters])

    const handleCheckboxChangeQuestions = (e, label) => {
        if (e.target.checked) {
            setSelectedLabelsQuestions([...selectedLabelsQuestions, label]);
        } else {
            setSelectedLabelsQuestions(selectedLabelsQuestions.filter(item => item !== label));
        }
    } // 질문 체크박스 선택한거 setState해주는 함수

    useEffect(()=> {
        // setCheckAll4(questions.every(item => selectedLabelsQuestions.includes(item)))
        let checkedBoxCount = 0;
        uniqueQuestions.map(item => {
            if(selectedLabelsQuestions.includes(item)){
                checkedBoxCount++;
            }
        });
        setCheckBoxCount4(checkedBoxCount)
    },[selectedLabelsQuestions])


    const [filterPresetTitle, setFilterPresetTitle] = useState('');

    const handleFilterTitle = (e) => {
        setFilterPresetTitle(e.target.value);
    }


    const CreateFilterPreset = () => {
        const data = {
            "idx_project_job_projectid":pathSplit,
            "filter_title":filterPresetTitle,
            "tp1":selectedLabelsPersons.join("//"),
            "tp2":selectedLabelsChapters.join("//"),
            "tp3":selectedLabelsSubchapters.join("//"),
            "tp4":selectedLabelsQuestions.join("//")
        }
        axios.post(SERVER_URL + 'filter/create', data, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                // console.log(res.data.msg)
                toastNoticeSuccess(res.data.msg)
                setShowModal(false);
                document.body.classList.remove('fixed');
            } else {
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })
    }

    const [selectedFilter, setSelectedFilter] = useState(''); // console.log(selectedFilter, '라디오 버튼 선택된거')
    const [filterPresetLoad, setFilterPresetLoad] = useState('');
    const [filterPresetLoadData1, setFilterPresetLoadData1] = useState([])
    const [filterPresetLoadData2, setFilterPresetLoadData2] = useState([])
    const [filterPresetLoadData3, setFilterPresetLoadData3] = useState([])
    const [filterPresetLoadData4, setFilterPresetLoadData4] = useState([])

    const [presetOn, setPresetOn] = useState(false)

    const DeleteFilterPreset = (but) => {
        // let idx = but.target.parentElement.previousElementSibling.id; // 클릭한 요소의 이전형제 요소
        let idx = but.target.parentElement.previousElementSibling.childNodes[0].id;
        console.log(idx)
        const data = {
            "idx_project_job_projectid":idx,
        }
        axios.post(SERVER_URL + 'filter/delete', data, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                console.log(res.data.msg)
            } else {
            }
        }).catch(err => {
            console.log(err);
            // toastNoticeError('에러가 발생했습니다.', '', '')
        })
    }

    // console.log(filterPresetList, '필터 정보값')
    // console.log(selectedFilter, '라디오 선택된 번호')
    // console.log(uniquePersons, '화자필터 리스트')
    const handlePresetLoad = () => {
        setFilterPresetLoad(filterPresetList.filter(item => item.idx_filter === selectedFilter)[0]);
        toastNoticeSuccess('필터프리셋이 적용되었습니다.')
    };

    useEffect(() => {
        setFilterPresetLoadData1(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[0] ? filterPresetLoad.filterDataList[0].filterDataArray.map(item => item.filter_data) : []);
        setFilterPresetLoadData2(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[1] ? filterPresetLoad.filterDataList[1].filterDataArray.map(item => item.filter_data) : []);
        setFilterPresetLoadData3(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[2] ? filterPresetLoad.filterDataList[2].filterDataArray.map(item => item.filter_data) : []);
        setFilterPresetLoadData4(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[3] ? filterPresetLoad.filterDataList[3].filterDataArray.map(item => item.filter_data) : []);
    }, [filterPresetLoad]);

    useEffect(()=> {
        setSelectedLabelsPersons(filterPresetLoadData1);
        setSelectedLabelsChapters(filterPresetLoadData2);
        setSelectedLabelsSubchapters(filterPresetLoadData3);
        setSelectedLabelsQuestions(filterPresetLoadData4);
        setPresetOn(!presetOn)
        // setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person))) // 화자 필터로 선택된 것으로 불러오기 누를때 서브챕터, 질문 보여주기
        // setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person))) // 화자 필터로 선택된 것으로 불러오기 누를때 서브챕터, 질문 보여주기
        setProjectDetailListFilterOrigin(projectDetailListOrigin)
        setProjectDetailListFilterOrigin2(projectDetailListOrigin)

    }, [filterPresetLoadData1, filterPresetLoadData2, filterPresetLoadData3, filterPresetLoadData4])

    useEffect(()=> {
        console.log(selectedLabelsQuestions)
        setProjectDetailList(projectDetailListOrigin.filter(item =>
            (!selectedLabelsPersons || selectedLabelsPersons.length === 0 || selectedLabelsPersons.some(selectedLabel => item.person === selectedLabel)) &&
            (!selectedLabelsChapters || selectedLabelsChapters.length === 0 || selectedLabelsChapters.includes(item.chapter)) &&
            (!selectedLabelsSubchapters || selectedLabelsSubchapters.length === 0 || selectedLabelsSubchapters.includes(item.subchapter)) &&
            (!selectedLabelsQuestions || selectedLabelsQuestions.length === 0 || selectedLabelsQuestions.includes(item.question))
        ));
        setCheckBoxCount(filterPresetLoadData1.length) // 화자 개수 설정
        setCheckBoxCount2(filterPresetLoadData2.length) // 챕터 개수 설정
        setCheckBoxCount3(filterPresetLoadData3.length) // 서브챕터 개수 설정
        setCheckBoxCount4(filterPresetLoadData4.length) // 질문 개수 설정

    },[presetOn])

    // console.log(filterPresetLoadData1, '화자 데이터')
    // console.log(filterPresetLoadData2, '챕터 데이터')
    // console.log(filterPresetLoadData3, '서브챕터 데이터')
    // console.log(filterPresetLoadData4, '질문 데이터')

    // console.log(selectedLabelsPersons, '화자')
    // console.log(selectedLabelsChapters, '챕터')
    // console.log(selectedLabelsSubchapters, '서브챕터')
    // console.log(selectedLabelsQuestions, '질문')

    console.log(projectDetailList, '디테일 리스트 변하는거 확인')

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
                            <button onClick={handleModalFilter1} type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>화자 {checkBoxCount > 0 ? <span className="count">{checkBoxCount}</span> : null}</button>
                            <button onClick={handleModalFilter2}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>챕터 {checkBoxCount2 > 0 ? <span className="count">{checkBoxCount2}</span> : null}</button>
                            <button onClick={handleModalFilter3}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>서브챕터 {checkBoxCount3 > 0 ? <span className="count">{checkBoxCount3}</span> : null}</button>
                            <button onClick={handleModalFilter4}  type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>질문 {checkBoxCount4 > 0 ? <span className="count">{checkBoxCount4}</span> : null}</button>
                            <button  onClick={handleModalFilter5} type="button"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>키워드</button>
                            <button type="button" onClick={handleFilterReset} className="refresh"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh_blue.svg'}/></button>
                            <div className="btn_select_box">
                                <button type="button" onClick={toggleClass} className="btn_select">필터값 저장 / 불러오기</button>
                                <div className="filter_preset" >
                                    <strong className="tit">필터 프리셋</strong>
                                    <p className="info">필터값을 프리셋으로 저장하여 사용할 수 있습니다.</p>
                                    <div className="filter_chk_box">
                                        {!filterPresetList || !filterPresetList.length ?
                                            <div className="input_box">
                                                <p>필터 프리셋 정보가 없습니다.</p>
                                            </div>
                                            :
                                            filterPresetList.map(item => (
                                                <div className="input_box" key={item.idx_filter}>
                                                    <div className="checkbox">
                                                        <input type="radio" name="preset_radio" id={item.idx_filter}
                                                               onChange={() => setSelectedFilter(item.idx_filter)}
                                                               checked={selectedFilter === item.idx_filter}
                                                        />
                                                        <label htmlFor={item.idx_filter}>{item.filter_title}</label>
                                                    </div>
                                                    <button type="button" onClick={DeleteFilterPreset} className="chk_delete"><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                                                </div>
                                            ))
                                        }

                                    </div>
                                    <div className="btn_box">
                                        {selectedFilter === '' ?
                                            <button type="button" onClick={handleButtonClick}>프리셋 만들기</button>
                                            :
                                            <button type="button" onClick={handlePresetLoad}>불러오기</button>
                                        }
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
                                    persons={persons}
                                    subchapters={subchapters}
                                    questions={questions}
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
                            <input type="text" placeholder="프리셋 이름을 입력해주세요.." name="filter_title" onChange={handleFilterTitle} />
                            <button><img src={process.env.PUBLIC_URL + '/assets/image/ico_search.svg'}/></button>
                        </div>
                    </div>
                    <div className="fixed_btn_box">
                        <button onClick={handleModalClose} type="button">취소</button>
                        <button type="button" onClick={CreateFilterPreset} type="button" className="co1">생성하기</button>
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



            {/*화자, 챕터, 서브챕터, 질문 공통 필터 + 키워드 필터 모달 */}
            {showModal3 && (
                <Modal in_fixed_btn="in_fixed_btn">



                    <div className="fixed_btn_box">
                        <button type="button">취소</button>
                        <button type="button" className="co1">선택완료</button>
                    </div>

                </Modal>
            )}


            {/*  화자 모달  */}
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
                                    <input type="checkbox" id="filter1" onChange={handleCheckAll1} checked={checkAll}/>
                                    <label htmlFor="filter1">전체선택</label>
                                </div>
                                <>
                                    {uniquePersons.map(item => (
                                        <div className="input_box">
                                            <input id={item} type="checkbox"
                                                   onChange={(e) => handleCheckboxChangePersons(e, item)}
                                                   checked={selectedLabelsPersons.includes(item)}/>
                                            <label htmlFor={item}>{item}</label>
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

            {/*  챕터 모달  */}
            <div onClick={handleModalFilterClose2} className={showFilterModal2? 'modal_area on' : 'modal_area off'}>
                <div className="modal_layout">
                    <div className="modal">
                        <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                            <div className="modal_title_box baseline">
                                <div className="title_box">
                                    <h3 className="tit">챕터 필터</h3>
                                    <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                                </div>
                                <button onClick={handleModalFilterClose2}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                            </div>
                            <div className="filter_check_box">
                                <div className="input_box end">
                                    <input type="checkbox" id="filter2" onChange={handleCheckAll2} checked={checkAll2}/>
                                    <label htmlFor="filter2">전체선택</label>
                                </div>
                                <>
                                    {uniqueChapters.map(item => (
                                        <div className="input_box">
                                            <input id={item} type="checkbox" onChange={(e) => handleCheckboxChangeChapters(e, item)} checked={selectedLabelsChapters.includes(item)}/>
                                            <label htmlFor={item}>{item}</label>
                                        </div>
                                    ))}
                                </>
                            </div>
                            <div className="fixed_btn_box">
                                <button onClick={handleModalFilterClose2} type="button">취소</button>
                                <button onClick={handleModalFilterSubmit2} type="button" className="co1">선택완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  서브챕터 모달  */}
            <div onClick={handleModalFilterClose3} className={showFilterModal3? 'modal_area on' : 'modal_area off'}>
                <div className="modal_layout">
                    <div className="modal"  >
                        <div className="modal_content in_fixed_btn" onClick={(e)=>e.stopPropagation()}>
                            <div className="modal_title_box baseline">
                                <div className="title_box">
                                    <h3 className="tit">서브챕터 필터</h3>
                                    <p className="info">선택한 챕터는 리포트 생성시 요약문 및 키워드 추출에 반영됩니다,</p>
                                </div>
                                <button onClick={handleModalFilterClose3}><img src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'} alt=""/></button>
                            </div>
                            <div className="filter_check_box">
                                <div className="input_box end">
                                    <input type="checkbox" id="filter3" onChange={handleCheckAll3} checked={checkAll3}/>
                                    <label htmlFor="filter3">전체선택</label>
                                </div>
                                <>
                                    {uniqueSubchapters.map(item => (
                                        <div className="input_box">
                                            <input id={item} type="checkbox" onChange={(e) => handleCheckboxChangeSubchapters(e, item)} checked={selectedLabelsSubchapters.includes(item)}/>
                                            <label htmlFor={item}>{item}</label>
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

            {/*  질문 모달  */}
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

            {/*  키워드 모달  */}
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
                            <div className="fixed_btn_box">
                                <button onClick={handleModalFilterClose5} type="button">취소</button>
                                <button onClick={handleModalFilterSubmit5} type="button" className="co1">선택완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProjectDetail;