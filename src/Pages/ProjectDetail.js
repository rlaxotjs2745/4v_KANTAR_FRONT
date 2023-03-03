import React, {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import axios from "axios";
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import {useToastAlert} from "../Util/toastAlert";
import InfiniteScroller from "../Components/Cards/InfiniteScroller";
import ProjectKeywordFilterModal from "../Components/Cards/ProjectKeywordFilterModal";
import ProjectPersonFilterModal from "../Components/Cards/ProjectPersonFilterModal";
import ProjectChapterFilterModal from "../Components/Cards/ProjectChapterFilterModal";
import ProjectSubChapterFilterModal from "../Components/Cards/ProjectSubChapterFilterModal";
import ProjectQuestionFilterModal from "../Components/Cards/ProjectQuestionFilterModal";
import ProjectWordCloudDetailModal from "../Components/Cards/ProjectWordCloudDetailModal";
import ProjectCreateWordCloudModal from "../Components/Cards/ProjectCreateWordCloudModal";
import ProjectCreateReportModal from "../Components/Cards/ProjectCreateReportModal";
import ProjectNewFilterPreset from "../Components/Cards/ProjectNewFilterPreset";
import html2canvas from 'html2canvas';

const ProjectDetail = () => {

    const {
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();


    const [cloudFilter, setCloudFilter] = useState([]);
    const [words, setWords] = useState([]);

    const options = {
        colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
        enableTooltip: true,
        deterministic: false,
        fontFamily: "impact",
        fontSizes: [15, 60],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean",
        transitionDuration: 1000
    };

    const [wordcloudDataList, setWordCloudDataList] = useState(null);

    const { pathname } = useLocation();
    const navigate = useNavigate()
    const pathSplit = Number(pathname.split('/')[2])


    const [projectDetailList, setProjectDetailList] = useState([])
    const [projectDetailListOrigin, setProjectDetailListOrigin] = useState([])
    const [projectDetailListFilterOrigin, setProjectDetailListFilterOrigin] = useState([]) // 화자랑 챕터에서 고른 후에 있는 서브챕터 리스트 원본용
    const [projectDetailListFilterOrigin2, setProjectDetailListFilterOrigin2] = useState([]) // 화자랑 챕터에서 고른 후에 있는 질문 리스트 원본용
    const [projectInfo, setProjectInfo] = useState([])

    const [showModal, setShowModal] = useState(false); // 프리셋 만들기
    const [showModal2, setShowModal2] = useState(false); // 리포트 생성
    const [showModal4, setShowModal4] = useState(false); // 워드 클라우드 생성 모달
    const [showModal5, setShowModal5] = useState(false); // 워드 클라우드 상세페이지 모달

    const [showFilterModal1, setShowFilterModal1] = useState(false) // 화자 모달
    const [showFilterModal2, setShowFilterModal2] = useState(false) // 챕터 모달
    const [showFilterModal3, setShowFilterModal3] = useState(false) // 서브챕터 모달
    const [showFilterModal4, setShowFilterModal4] = useState(false) // 질문 모달
    const [showFilterModal5, setShowFilterModal5] = useState(false) // 키워드 모달
    const [filterPresetList, setFilterPresetList] = useState([])
    const [deleteCheck, setDeleteCheck] = useState(false)
    const [uType, setUType] = useState(11);

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
        axios.post(SERVER_URL + 'project/project_view', {"idx_project_job_projectid" : pathSplit}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                // console.log(res.data.data.proData, '?124124412142142412?')
                setProjectDetailList(res.data.data.proData[1])
                setProjectDetailListOrigin(res.data.data.proData[1])
                setProjectInfo(res.data.data.proData[0])
                setUType(res.data.data.userType);

            } else if(res.data.success === '0'){
                navigate('/');
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            toastNoticeError('에러가 발생했습니다.')
            // navigate('/');
        })
    },[])

    useEffect(()=> {
        // console.log(projectDetailList, '바뀌나요?')
    },[projectDetailList])



    const DeleteFilterPreset = (but) => {
        // let idx = but.target.parentElement.previousElementSibling.id; // 클릭한 요소의 이전형제 요소
        let idx = but.target.parentElement.previousElementSibling.childNodes[0].id;
        const data = {
            "idx_filter":Number(idx),
        }
        axios.post(SERVER_URL + 'filter/del', data, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                toastNoticeSuccess(res.data.msg)
                setSelectedFilter('') // 필터프리셋 선택 해제
                setDeleteCheck(!deleteCheck) // 값 확인용 state
            } else {
                toastNoticeWarning(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            // toastNoticeError('에러가 발생했습니다.', '', '')
        })
    }

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
    },[showModal, deleteCheck])

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

        if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if (checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if ( (checkBoxCount3 > 0 || checkBoxCount4 > 0) && checkBoxCount2 === 0) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        } else if ( checkBoxCount4 > 0 && checkBoxCount3 === 0) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            toastNoticeWarning('질문이 초기화 됩니다.')
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0){
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if(checkBoxCount > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        } else if(checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else {
            setProjectDetailList(projectDetailListOrigin)
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
        setSelectedLabelsChapters([...chaptersFilterModalOrigin])
        setShowFilterModal2(false)
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
        setShowFilterModal2(false)
        if (JSON.stringify(selectedLabelsChapters) !== JSON.stringify(chaptersFilterModalOrigin)) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        }
        //
        // if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
        //     setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (
        //         item.person.includes(dictWord) ||
        //         item.chapter.includes(dictWord) ||
        //         item.subchapter.includes(dictWord) ||
        //         item.question.includes(dictWord) ||
        //         item.answer.includes(dictWord)
        //     ))))
        // }

        if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if (checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if ( (checkBoxCount3 > 0 || checkBoxCount4 > 0) && checkBoxCount2 === 0) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        } else if ( checkBoxCount4 > 0 && checkBoxCount3 === 0) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            toastNoticeWarning('질문이 초기화 됩니다.')
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0){
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if(checkBoxCount > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        } else if(checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else {
            setProjectDetailList(projectDetailListOrigin)
        }

        setChapterSubmitHandle(!chapterSubmitHandle)
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
        if (JSON.stringify(selectedLabelsSubchapters) !== JSON.stringify(subchaptersFilterModalOrigin)) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            toastNoticeWarning('질문이 초기화 됩니다.')
        }
        if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if (checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if ( (checkBoxCount3 > 0 || checkBoxCount4 > 0) && checkBoxCount2 === 0) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        } else if ( checkBoxCount4 > 0 && checkBoxCount3 === 0) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            toastNoticeWarning('질문이 초기화 됩니다.')
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0){
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if(checkBoxCount > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        } else if(checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else {
            setProjectDetailList(projectDetailListOrigin)
        }

        // setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        setShowFilterModal3(false)
        setSubchapterSubmitHandle(!subchapterSubmitHandle)
    }

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
        if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if (checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if ( (checkBoxCount3 > 0 || checkBoxCount4 > 0) && checkBoxCount2 === 0) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        } else if ( checkBoxCount4 > 0 && checkBoxCount3 === 0) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            toastNoticeWarning('질문이 초기화 됩니다.')
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0){
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if(checkBoxCount > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        } else if(checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else {
            setProjectDetailList(projectDetailListOrigin)
        }

        setShowFilterModal4(false)
    }



    const handleModalFilter5 = () => {
        setShowFilterModal5(true)
        setkeywordsFilterModalOrigin([...selectedDictDataR])
        document.body.classList.add('fixed');
    }; // 키워드 필터 오픈

    const handleModalFilterClose5 = () => {
        setShowFilterModal5(false)
        setSelectedDictDataR([...keywordsFilterModalOrigin])
        document.body.classList.remove('fixed');
    }; // 키워드 필터 닫힘

    const handleModalFilterSubmit5 = () => {
        if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if (checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question)))
        } else if ( (checkBoxCount3 > 0 || checkBoxCount4 > 0) && checkBoxCount2 === 0) {
            setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            toastNoticeWarning('서브챕터와 질문이 초기화 됩니다.')
        } else if ( checkBoxCount4 > 0 && checkBoxCount3 === 0) {
            setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화
            setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            toastNoticeWarning('질문이 초기화 됩니다.')
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if(checkBoxCount > 0 && checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount4 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedLabelsQuestions.includes(item.question) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount3 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount > 0 && checkBoxCount2 > 0){
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if(checkBoxCount > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if(checkBoxCount2 > 0 && checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person)))
        } else if(checkBoxCount5 > 0) {
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedDictDataR.some(dictWord => (item.answer.includes(dictWord)))))
        } else {
            setProjectDetailList(projectDetailListOrigin)
        }
        setShowFilterModal5(false)
    } // 키워드 필터 선택완료 버튼



    const handleFilterReset = () => {
        setProjectDetailList(projectDetailListOrigin) // 리스트 초기화

        setSelectedLabelsPersons([]); // 화자 필터 라벨 초기화 (전체 선택되어있는 상태로)
        setSelectedLabelsChapters([]); // 챕터 필터 라벨 초기화
        setSelectedLabelsSubchapters([]); // 서브챕터 필터 라벨 초기화
        setSelectedLabelsQuestions([]); // 질문 필터 라벨 초기화

        setProjectDetailListFilterOrigin([]) // 서브챕터 라벨 리스트 초기화
        setProjectDetailListFilterOrigin2([]) // 질문 필터 라벨 리스트 초기화
        setSelectedDictDataR([]) // 키워드 선택 초기화

        setSelectedFilter('') // 필터프리셋 선택 해제
        toastNoticeSuccess('필터를 초기화 하였습니다.')
    }


    const [input, setInput] = useState({ value: '', characters: 0 }); // 리포트 생성 리포트 이름 0/50 글자 개수제한
    const [input2, setInput2] = useState({ value: '', characters: 0 }); // 워드 클라우드 이름 0/20 글자 개수제한

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
    const handleButtonClick4 = (idx) => {

        setShowModal4(true);
        document.body.classList.add('fixed');
    };

    const handleModalClose4 = () => {
        setShowModal4(false);
        document.body.classList.remove('fixed');
    };

    // 워드 클라우드 상세페이지 모달
    const handleButtonClick5 = (but) => {
        let idx = Number(but.target.parentElement.parentElement.id); // 클릭한 요소의 부모의 부모의 id값
        axios.post(SERVER_URL + 'word/wordcloud_view', {"idx_wordcloud" : idx} , AXIOS_OPTION).then(res => {

            if(res.data.success === '1'){
                setWords(res.data.data.keyword)
                setCloudFilter(res.data.data.filter)
                setShowModal5(true);
                document.body.classList.add('fixed');
            } else {

            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })


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
        setProjectDetailList(projectDetailListOrigin) // 서버 데이터 파싱 안되는 경우 처리
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
    const [keywordsFilterModalOrigin, setkeywordsFilterModalOrigin] = useState([])


    const [checkBoxCount, setCheckBoxCount] = useState(0)
    const [checkBoxCount2, setCheckBoxCount2] = useState(0)
    const [checkBoxCount3, setCheckBoxCount3] = useState(0)
    const [checkBoxCount4, setCheckBoxCount4] = useState(0)
    const [checkBoxCount5, setCheckBoxCount5] = useState(0)

    const [selectedDictR, setSelectedDictR] = useState([]);
    const [dictDataR, setDictDataR] = useState([]);
    const [selectedDictDataR, setSelectedDictDataR] = useState([]);
    const [dictAllR, setDictAllR] = useState(false);
    const [dictDataAllR, setDictDataAllR] = useState(false);
    const [dictDataRaw, setDictDataRaw] = useState([]);


    const [createReportCheckboxes, setCreateReportCheckboxes] = useState([0, 0, 0, 0, 3]);

    const handleCheckboxChange = (index, event, type) => {
        const newCheckboxes = [...createReportCheckboxes];
        if(type && type === 'chk'){
            if(event.target.id === 'chk11'){
                if(event.target.checked){
                    newCheckboxes[index] += 1;
                } else {
                    newCheckboxes[index] -= 1;
                }
            } else {
                if(event.target.checked){
                    newCheckboxes[index] += 2;
                } else {
                    newCheckboxes[index] -= 2;
                }
            }
        } else {
            newCheckboxes[index] = event.target.checked ? 1 : 0;
        }
        setCreateReportCheckboxes(newCheckboxes);
    };


    const handleCheckboxChangePersons = (e, label) => {
        if (e.target.checked) {
            setSelectedLabelsPersons([...selectedLabelsPersons, label]);
        } else {
            setSelectedLabelsPersons(selectedLabelsPersons.filter(item => item !== label));
        }
    }// 화자 체크박스 선택한거 setState해주는 함수

    // useEffect(() => {
    //     setSelectedLabelsPersons(persons);
    // }, [persons]);

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
        // setCheckAll(persons.every(item => selectedLabelsPersons.includes(item))) 화자 기본 전체선택 체크되게
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

    useEffect(()=>{
        setCheckBoxCount5(selectedDictDataR.length)
    },[selectedDictDataR])

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
            "tp4":selectedLabelsQuestions.join("//"),
            "tp5":selectedDictDataR.join("//")
        }
        axios.post(SERVER_URL + 'filter/create', data, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
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
    const [filterPresetLoadData5, setFilterPresetLoadData5] = useState([])
    const [presetOn, setPresetOn] = useState(false)



    const handlePresetLoad = () => {
        setFilterPresetLoad(filterPresetList.filter(item => item.idx_filter === selectedFilter)[0]);

        toastNoticeSuccess('필터프리셋이 적용되었습니다.')
    };

    useEffect(() => {
        if(filterPresetLoad && filterPresetLoad.filterDataList.find(item => item.filter_type === 1) === undefined ) {
            setFilterPresetLoadData2(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[0] ? filterPresetLoad.filterDataList[0].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData3(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[1] ? filterPresetLoad.filterDataList[1].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData4(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[2] ? filterPresetLoad.filterDataList[2].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData5(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[3] ? filterPresetLoad.filterDataList[3].filterDataArray.map(item => item.filter_data) : []);
        } else {
            setFilterPresetLoadData1(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[0] ? filterPresetLoad.filterDataList[0].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData2(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[1] ? filterPresetLoad.filterDataList[1].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData3(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[2] ? filterPresetLoad.filterDataList[2].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData4(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[3] ? filterPresetLoad.filterDataList[3].filterDataArray.map(item => item.filter_data) : []);
            setFilterPresetLoadData5(filterPresetLoad && filterPresetLoad.filterDataList && filterPresetLoad.filterDataList[4] ? filterPresetLoad.filterDataList[4].filterDataArray.map(item => item.filter_data) : []);
        }
    }, [filterPresetLoad]);

    useEffect(()=> {
        setSelectedLabelsPersons(filterPresetLoadData1);
        setSelectedLabelsChapters(filterPresetLoadData2);
        setSelectedLabelsSubchapters(filterPresetLoadData3);
        setSelectedLabelsQuestions(filterPresetLoadData4);
        setSelectedDictDataR(filterPresetLoadData5);

        setPresetOn(!presetOn)
        // setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person))) // 화자 필터로 선택된 것으로 불러오기 누를때 서브챕터, 질문 보여주기
        // setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person))) // 화자 필터로 선택된 것으로 불러오기 누를때 서브챕터, 질문 보여주기
        setProjectDetailListFilterOrigin(projectDetailListOrigin)
        setProjectDetailListFilterOrigin2(projectDetailListOrigin)

    }, [filterPresetLoadData1, filterPresetLoadData2, filterPresetLoadData3, filterPresetLoadData4, filterPresetLoadData5])

    useEffect(()=> {
        setProjectDetailList(projectDetailListOrigin.filter(item =>
            (!selectedLabelsPersons || selectedLabelsPersons.length === 0 || selectedLabelsPersons.some(selectedLabel => item.person === selectedLabel)) &&
            (!selectedLabelsChapters || selectedLabelsChapters.length === 0 || selectedLabelsChapters.includes(item.chapter)) &&
            (!selectedLabelsSubchapters || selectedLabelsSubchapters.length === 0 || selectedLabelsSubchapters.includes(item.subchapter)) &&
            (!selectedLabelsQuestions || selectedLabelsQuestions.length === 0 || selectedLabelsQuestions.includes(item.question)) &&
            (!selectedDictDataR || selectedDictDataR.length === 0 || selectedDictDataR.some(dictWord => (
                    item.person.includes(dictWord) ||
                    item.chapter.includes(dictWord) ||
                    item.subchapter.includes(dictWord) ||
                    item.question.includes(dictWord) ||
                    item.answer.includes(dictWord)
                )))
            ));
        setCheckBoxCount(filterPresetLoadData1.length) // 화자 개수 설정
        setCheckBoxCount2(filterPresetLoadData2.length) // 챕터 개수 설정
        setCheckBoxCount3(filterPresetLoadData3.length) // 서브챕터 개수 설정
        setCheckBoxCount4(filterPresetLoadData4.length) // 질문 개수 설정

    },[presetOn])



    const createReport = () => {
        if(input.value === '' || !input.value){
            return toastNoticeWarning('리포트 이름을 입력해주세요.');
        }

        const radioButtons = document.getElementsByName('switch');
        let selectedValue;
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break;
            }
        }
        if(createReportCheckboxes[4] < 1) {
            return toastNoticeWarning('1개 이상의 품사를 선택해 주세요.')
        }
        let param = {
            "idx_project" : projectInfo.idx_project,
            "idx_project_job_projectid" : projectInfo.idx_project_job_projectid,
            "title" : input.value,
            "rfil0" : createReportCheckboxes[0],
            "rfil1" : 1,
            "rfil2" : createReportCheckboxes[1],
            "rfil3" : createReportCheckboxes[2],
            "rfil4" : createReportCheckboxes[3],
            "rfil5" : createReportCheckboxes[4],
            "tp1" : [...new Set(selectedLabelsPersons)].join("//") === '' ? null : [...new Set(selectedLabelsPersons)].join("//"),
            "tp2" : [...new Set(selectedLabelsChapters)].join("//") === '' ? null : [...new Set(selectedLabelsChapters)].join("//"),
            "tp3" : [...new Set(selectedLabelsSubchapters)].join("//") === '' ? null : [...new Set(selectedLabelsSubchapters)].join("//"),
            "tp4" : [...new Set(selectedLabelsQuestions)].join("//") === '' ? null : [...new Set(selectedLabelsQuestions)].join("//"),
            "tp5" : selectedDictDataR.join("//") === '' ? null : selectedDictDataR.join("//")
        }


        axios.post(SERVER_URL + 'report/save_filter_report', param, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                toastNoticeSuccess(res.data.msg)
                setShowModal2(false);
            } else {
                toastNoticeWarning(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const [chapterSubmitHandle, setChapterSubmitHandle] = useState(false)
    const [subchapterSubmitHandle, setSubchapterSubmitHandle] = useState(false)

    useEffect(()=>{
        if (checkBoxCount2 > 0 && checkBoxCount > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) ))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter)))
        } else if (checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter)))
        }
    },[chapterSubmitHandle])

    useEffect(()=>{
        if (checkBoxCount3 > 0 && checkBoxCount2 > 0 && checkBoxCount > 0) {
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsPersons.includes(item.person) && selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        } else if (checkBoxCount3 > 0 && checkBoxCount2 > 0) {
            setProjectDetailListFilterOrigin2(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
            setProjectDetailList(projectDetailListOrigin.filter(item => selectedLabelsChapters.includes(item.chapter) && selectedLabelsSubchapters.includes(item.subchapter)))
        }
    },[subchapterSubmitHandle])


    const handleDownload = () => {
        axios.get(SERVER_URL + 'project/download', {
            params: { "idx_project_job_projectid" : pathSplit }
            ,...AXIOS_OPTION
            ,responseType: 'blob'
        }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', projectInfo.filename);
            document.body.appendChild(link);
            link.click();
        }).catch(err => {
            console.log(err);
        })
    }

    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 300) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    const createWordCloud = () => {
        const data = {
            "idx_project_job_projectid" : projectInfo.idx_project_job_projectid,
            "title":input2.value,
            "keyType" : 3,
            "tp1" : [...new Set(selectedLabelsPersons)].join("//") === '' ? null : [...new Set(selectedLabelsPersons)].join("//"),
            "tp2" : [...new Set(selectedLabelsChapters)].join("//") === '' ? null : [...new Set(selectedLabelsChapters)].join("//"),
            "tp3" : [...new Set(selectedLabelsSubchapters)].join("//") === '' ? null : [...new Set(selectedLabelsSubchapters)].join("//"),
            "tp4" : [...new Set(selectedLabelsQuestions)].join("//") === '' ? null : [...new Set(selectedLabelsQuestions)].join("//"),
            "tp5" : selectedDictDataR.join("//") === '' ? null : selectedDictDataR.join("//")
        }

        axios.post(SERVER_URL + 'word/save_word_cloud', data, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                toastNoticeSuccess(res.data.msg)
                setShowModal4(false)
            } else {
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const [currentLastPage, setCurrentLastPage] = useState(1)
    const [currentPageNumber, setCurrentPageNumber] = useState(1)

    useEffect(()=> {
        fetchData();
        // const intervalId = setInterval(fetchData, 10000);
        // return () => clearInterval(intervalId);
    },[currentPageNumber, showModal4])

    const fetchData = async () => {
        axios.post(SERVER_URL + 'word/list_wordcloud', {"idx_project_job_projectid" : pathSplit, "currentPage" : currentPageNumber}, AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setWordCloudDataList(res.data.data)
                setCurrentLastPage(() => {
                    if(Math.ceil(res.data.data.tcnt/10) * 10 - res.data.data.tcnt === 0) {
                        return Math.floor(res.data.data.tcnt/10)
                    } else {
                        return Math.floor(res.data.data.tcnt/10)+1
                    }
                })
            } else if(res.data.success === '0'){
                // navigate('/');
                // toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            toastNoticeError('에러가 발생했습니다.')
            // navigate('/');
        })
    };

    let handleLeftClick = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber(currentPageNumber - 1);
        } else {
            toastNoticeWarning('첫번째 페이지 입니다.')
            setCurrentPageNumber(1);
        }
    };

    let handleRightClick = () => {
        if(currentPageNumber === currentLastPage) {
            toastNoticeWarning('마지막 페이지 입니다.')
        } else {
            setCurrentPageNumber(currentPageNumber + 1)
        }
    };

    const [image, setImage] = useState(null);

    const capture = () => {
        const wordCloudBox = document.getElementById('word_cloud_img_box');
        html2canvas(wordCloudBox, {
            scrollX: 0, // 가로 스크롤 위치
            scrollY: 0, // 세로 스크롤 위치
        }).then(canvas => {
            const imgData = canvas.toDataURL();
            setImage(imgData);
            const link = document.createElement('a');
            link.download = 'word_cloud.png';
            link.href = imgData;
            link.click();
        });
    }


    return(
        <>
            <div className="page">
                {showButton &&
                    <button id="top" onClick={scrollToTop} className="btn_top"><img src={process.env.PUBLIC_URL + '/assets/image/btn_top.svg'} alt=""/></button>
                }
                <form>
                    <div className="file_upload_area">
                        <div className="head">
                            <button onClick={() => navigate('/')}>
                                <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_arrow_back.svg'}/>
                            </button>
                            <h2>{projectInfo ? projectInfo.project_name : ''}</h2>
                        </div>
                        <div className="title_section pd0">
                            <div className="title_box">
                                <h3 className="title">Raw Data</h3>
                                <p className="info">위 필터를 설정해 리포트를 생성할 수 있습니다.</p>
                            </div>
                            {
                                uType === 1|| uType === 99 ?
                                    <div className="btn_box">
                                        <button onClick={handleButtonClick4} type="button" className="cds--btn cds--btn--tertiary">워드 클라우드 열기</button>
                                        <button onClick={handleDownload} type="button" className="download cds--btn cds--btn--tertiary">데이터 다운로드</button>
                                        <button onClick={handleButtonClick2} type="button" className="plus cds--btn">리포트 생성</button>
                                    </div>
                                    :
                                    <div className="btn_box">
                                        <button onClick={handleDownload} type="button" className="download cds--btn cds--btn--tertiary">데이터 다운로드</button>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        uType === 1|| uType === 99 ?
                            <div className="project_detail_area">
                                <div className="filter_btn_box">
                                    <button onClick={handleModalFilter1} type="button"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>화자 {checkBoxCount > 0 ?
                                        <span className="count">{checkBoxCount}</span> : null}</button>
                                    <button onClick={handleModalFilter2} type="button"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>챕터 {checkBoxCount2 > 0 ?
                                        <span className="count">{checkBoxCount2}</span> : null}</button>
                                    <button onClick={handleModalFilter3} type="button"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>서브챕터 {checkBoxCount3 > 0 ?
                                        <span className="count">{checkBoxCount3}</span> : null}</button>
                                    <button onClick={handleModalFilter4} type="button"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>질문 {checkBoxCount4 > 0 ?
                                        <span className="count">{checkBoxCount4}</span> : null}</button>
                                    <button onClick={handleModalFilter5} type="button"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_filter.svg'}/>키워드 {checkBoxCount5 > 0 ?
                                        <span className="count">{checkBoxCount5}</span> : null}</button>
                                    <button type="button" onClick={handleFilterReset} className="refresh"><img alt=""
                                        src={process.env.PUBLIC_URL + '/assets/image/ico_btn_refresh_blue.svg'}/>
                                    </button>
                                    <div className="btn_select_box">
                                        <button type="button" onClick={toggleClass} className="btn_select">필터값 저장 /
                                            불러오기
                                        </button>
                                        <div className="filter_preset">
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
                                                                <input type="radio" name="preset_radio"
                                                                       id={item.idx_filter}
                                                                       onClick={() => {
                                                                           if (selectedFilter === item.idx_filter) {
                                                                               // console.log('여기 되고있어요?')
                                                                               setSelectedFilter('')
                                                                           } else {
                                                                               setSelectedFilter(item.idx_filter);
                                                                           }
                                                                       }}
                                                                       checked={selectedFilter === item.idx_filter}
                                                                />
                                                                <label
                                                                    htmlFor={item.idx_filter}>{item.filter_title}</label>
                                                            </div>
                                                            <button type="button" onClick={DeleteFilterPreset}
                                                                    className="chk_delete"><img
                                                                src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete_black.svg'}
                                                                alt=""/></button>
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
                            </div> : null
                    }
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
                <ProjectNewFilterPreset
                    key="newFilterPreset"
                    handleModalClose={handleModalClose}
                    handleFilterTitle={handleFilterTitle}
                    CreateFilterPreset={CreateFilterPreset}
                />
            )}

            {/* 리포트 생성 모달 */}
            {showModal2 && (
                <ProjectCreateReportModal
                    key="createReportModal"
                    handleModalClose2={handleModalClose2}
                    input={input}
                    handleChange={handleChange}
                    setInput={setInput}
                    createReportCheckboxes={createReportCheckboxes}
                    handleCheckboxChange={handleCheckboxChange}
                    checkBoxCount3={checkBoxCount3}
                    checkBoxCount4={checkBoxCount4}
                    createReport={createReport}
                />
            )}

            {/* 워드 클라우드 생성 모달 */}
            {showModal4 && (
                <ProjectCreateWordCloudModal
                    key="createWordCloudModal"
                    handleModalClose4={handleModalClose4}
                    input2={input2}
                    handleChange={handleChange}
                    setInput2={setInput2}
                    handleButtonClick5={handleButtonClick5}
                    wordcloudDataList={wordcloudDataList}
                    createWordCloud={createWordCloud}
                    handleLeftClick={handleLeftClick}
                    handleRightClick={handleRightClick}
                    currentPageNumber={currentPageNumber}
                />
            )}

            {/* 워드 클라우드 상세 모달 */}
            {showModal5 && (
                <ProjectWordCloudDetailModal
                    key="wordCloudDetailModal"
                    handleModalClose5={handleModalClose5}
                    options={options}
                    words={words}
                    cloudFilter={cloudFilter}
                    image={image}
                    capture={capture}
                />
            )}

            {/*  화자 모달  */}
            <ProjectPersonFilterModal
                key="personModal"
                handleModalFilterClose1={handleModalFilterClose1}
                showFilterModal1={showFilterModal1}
                handleCheckAll1={handleCheckAll1}
                checkAll={checkAll}
                uniquePersons={uniquePersons}
                handleCheckboxChangePersons={handleCheckboxChangePersons}
                selectedLabelsPersons={selectedLabelsPersons}
                handleModalFilterSubmit1={handleModalFilterSubmit1}
            />

            {/*  챕터 모달  */}
            <ProjectChapterFilterModal
                key="chapterFilterModal"
                handleModalFilterClose2={handleModalFilterClose2}
                showFilterModal2={showFilterModal2}
                handleCheckAll2={handleCheckAll2}
                checkAll2={checkAll2}
                uniqueChapters={uniqueChapters}
                selectedLabelsChapters={selectedLabelsChapters}
                handleCheckboxChangeChapters={handleCheckboxChangeChapters}
                handleModalFilterSubmit2={handleModalFilterSubmit2}
            />

            {/*  서브챕터 모달  */}
            <ProjectSubChapterFilterModal
                key="subChapterFilterModal"
                handleModalFilterClose3={handleModalFilterClose3}
                showFilterModal3={showFilterModal3}
                handleCheckAll3={handleCheckAll3}
                checkAll3={checkAll3}
                uniqueSubchapters={uniqueSubchapters}
                selectedLabelsSubchapters={selectedLabelsSubchapters}
                handleCheckboxChangeSubchapters={handleCheckboxChangeSubchapters}
                handleModalFilterSubmit3={handleModalFilterSubmit3}
            />

            {/*  질문 모달  */}
            <ProjectQuestionFilterModal
                key="questionFilterModal"
                handleModalFilterClose4={handleModalFilterClose4}
                showFilterModal4={showFilterModal4}
                handleCheckAll4={handleCheckAll4}
                checkAll4={checkAll4}
                uniqueQuestions={uniqueQuestions}
                selectedLabelsQuestions={selectedLabelsQuestions}
                handleModalFilterSubmit4={handleModalFilterSubmit4}
                handleCheckboxChangeQuestions={handleCheckboxChangeQuestions}
            />

            {/*  키워드 모달  */}
            {showFilterModal5 && (
                    <ProjectKeywordFilterModal
                        handleModalFilterClose5={handleModalFilterClose5}
                        showFilterModal5={showFilterModal5}
                        handleModalFilterSubmit5={handleModalFilterSubmit5}
                        setSelectedDictR={setSelectedDictR}
                        setDictDataR={setDictDataR}
                        setSelectedDictDataR={setSelectedDictDataR}
                        setDictAllR={setDictAllR}
                        setDictDataAllR={setDictDataAllR}
                        selectedDictR={selectedDictR}
                        dictDataR={dictDataR}
                        selectedDictDataR={selectedDictDataR}
                        dictAllR={dictAllR}
                        dictDataAllR={dictDataAllR}
                        dictDataRaw={dictDataRaw}
                        setDictDataRaw={setDictDataRaw}
                />
            )}
        </>
    )
}

export default ProjectDetail;