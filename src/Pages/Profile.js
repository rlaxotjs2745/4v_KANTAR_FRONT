import * as React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { AXIOS_OPTION, SERVER_URL } from "../Util/env";
import $ from "jquery";
import {useToastAlert} from "../Util/toastAlert";

const Profile = () => {
    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();


    const [passwordTypes, setPasswordTypes] = useState({
        'origin_pw': { type: 'password', visible: false },
        'new_pw': { type: 'password', visible: false },
        'new_pw_chk': { type: 'password', visible: false }
    });

    const [userProfileData, setUserProfileData] = useState([])
    const [initialValues, setInitialValues] = useState({
        "user_name": "",
        "user_phone": "",
    });

    const handlePasswordType = inputId => {
        setPasswordTypes(prevState => {
            const updatedPasswordTypes = { ...prevState };
            updatedPasswordTypes[inputId] = {
                ...prevState[inputId],
                type: prevState[inputId].type === 'password' ? 'text' : 'password',
                visible: !prevState[inputId].visible
            };
            return updatedPasswordTypes;
        });
    };

    const navigate = useNavigate();



    const formSchema = yup.object({
        // 이름
        user_name:yup
            .string()
            .matches(
                // /^[가-힣]{2,7}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}|[a-zA-Z]{2,30}$/,
                /^[가-힣a-zA-Z0-9]{2,30}$/,
                '한글, 영어, 숫자만 사용가능합니다.'
            ),
        // 기존 비밀번호
        user_pw_origin: yup
            .string()
        // .min(8, '8자 이상의 비밀번호만 사용할 수 있습니다')
        // .max(12, '12자 이하의 비밀번호만 사용할 수 있습니다')
        // .matches(
        //     /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
        //     '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
        // ),
        ,
        // 비밀번호
        password: yup
            .string()
            // .min(8, '8자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(12, '12자 이하의 비밀번호만 사용할 수 있습니다')
            // .matches(
            //     /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
            //     {excludeEmptyString:true, message:'영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'}
            // )
            .nullable(),
        // 비밀번호 확인
        user_pw: yup
            .string()
            // .min(8, '8자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(12, '12자 이하의 비밀번호만 사용할 수 있습니다')
            .oneOf([yup.ref('password')], '비밀번호가 동일하지 않습니다.')
            .nullable(),
        user_phone: yup
            .string()
            .matches(
                /^\d{3}\d{3,4}\d{4}$/,
                {excludeEmptyString:true, message:'형식에 맞게 입력해주세요. 예) 01012345678'}
            )
            .nullable(),
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors, isSubmitting },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: {
            // "user_name": userProfileData.user_name,
            // "user_phone": userProfileData.user_phone
        },
    });


    useEffect(()=>{
        axios.post(SERVER_URL + 'user/member_info', AXIOS_OPTION).then(res => {
            if(res.data.success === '1'){
                setUserProfileData(res.data.data)

            } else {
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            console.log(err);
            toastNoticeError('에러가 발생했습니다.', '', '')
        })

    },[])

    useEffect(()=> {
        setValue('user_name', userProfileData.user_name)
        setValue('user_phone', userProfileData.user_phone)
    },[userProfileData])



    const onError = (errors) => {
        console.log(errors);
    };

    const ProfileSubmit = (data) => {
        let formData = {
            'idx_user' : userProfileData.idx_user,
            'user_name' : data.user_name,
            'user_phone' : data.user_phone,
            'user_pw_origin' : data.user_pw_origin,
            'user_pw' : data.user_pw,
        }

        // console.log(formData)

        axios.post(SERVER_URL + 'user/member_modify', formData, AXIOS_OPTION).then(res => {
            console.log(res.data.success, '응답')
            if(res.data.success === "1"){
                toastNoticeSuccess(res.data.msg)
                navigate('/')
                // toastNoticeSuccess(res.msg)
            } else if(res.data.success === "0"){
                toastNoticeError(res.data.msg)
            }
        }).catch(err => {
            // console.log(err);
        });
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit(ProfileSubmit, onError)}>
                <div className="profile_area">
                    <div className="profile_box">
                        <h3>{userProfileData.user_name}</h3>
                        <p className="user_id">{userProfileData.user_id}</p>
                        {/* 계정정보 추가 */}
                        <span className="grade">
                            {userProfileData.user_type === 1 ? '일반 계정' :
                                userProfileData.user_type === 11 ? '관리자 계정' :
                                    userProfileData.user_type === 99 ? '슈퍼관리자 계정' : null
                            }
                        </span>
                    </div>
                    <div className="profile_box">
                        <h3>멤버 정보</h3>
                        <div className="input_box">
                            <label htmlFor="user_id">이름</label>
                            <input id="user_id" type="text" name="user_name" {...register('user_name')}/>
                        </div>
                        {errors.user_name && <p className="error_tip">{errors.user_name.message}</p>}
                        <div className="input_box">
                            <label htmlFor="user_tel">전화번호</label>
                            <input id="user_tel" type="tel" name="user_phone" {...register('user_phone')}/>
                        </div>
                        {errors.user_phone && <p className="error_tip">{errors.user_phone.message}</p>}
                    </div>
                    <div className="profile_box">
                        <h3>비밀번호 변경</h3>
                        <div className="input_box">
                            <label htmlFor="origin_pw">현재 비밀번호</label>
                            <div className="input_btn">
                                <input id="origin_pw" name="user_pw_origin" type={passwordTypes['origin_pw'].type} {...register('user_pw_origin')}/>
                                <button type="button" onClick={() => handlePasswordType('origin_pw')}>
                                    {passwordTypes['origin_pw'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="input_box">
                            <label htmlFor="new_pw">새로운 비밀번호</label>
                            <div className="input_btn">
                                <input id="new_pw" name="password" type={passwordTypes['new_pw'].type} {...register('password')}/>
                                <button type="button" onClick={() => handlePasswordType('new_pw')} >
                                    {passwordTypes['new_pw'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                            <p className="tip">한글, 숫자, 영어, 특수기호 포함 8~12글자</p>
                            {errors.password && <p className="error_tip">{errors.password.message}</p>}
                        </div>
                        <div className="input_box">
                            <label htmlFor="new_pw_chk">새로운 비밀번호 확인</label>
                            <div className="input_btn">
                                <input id="new_pw_chk" name="user_pw" type={passwordTypes['new_pw_chk'].type} {...register('user_pw')}/>
                                <button type="button" onClick={() => handlePasswordType('new_pw_chk')}>
                                    {passwordTypes['new_pw_chk'].visible ? (
                                        <span>가리기</span>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/assets/image/ico_pw_off.svg'} alt="" />
                                    )}
                                </button>
                            </div>
                            {errors.user_pw && <p className="error_tip">{errors.user_pw.message}</p>}
                        </div>
                    </div>
                    <div className="btn_box">
                        <button>저장하기</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile;