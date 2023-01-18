import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {AXIOS_OPTION, SERVER_URL} from "../Util/env";
import axios from 'axios';
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import {useToastAlert} from "../Util/toastAlert";

const Login = () => {

    const {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    } = useToastAlert();

    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);

    const loginSubmit = (data) => {

        // navigate('/')

        console.log(data.user_id , '유저 아이디값')
        console.log(data.user_pw , '유저 비밀번호값')

        axios.post(SERVER_URL + 'user/login', {'user_id' : data.user_id, 'user_pw' : data.user_pw}).then(res => {
            console.log(res)
            if(res.data.success === "0"){
                // 로그인 정보를 다시 확인해주세요.
                // setloginMessage(res.data.result_str)
                toastNoticeError(res.data.msg)
            } else if(res.data.success === '1') {
                // axios.defaults.headers.common['X-AUTH-TOKEN'] = res.data.data.token;
                setCookie('X-AUTH-TOKEN', res.data.data.token);
                toastNoticeSuccess('로그인 되었습니다.')
                navigate('/')
            }
        })
            .catch((error)=> {
                console.log(error)
            })
    }

    const formSchema = yup.object({
        user_id: yup
            .string()
            .required('아이디를 입력해주세요.')
            // .email('이메일 형식이 아닙니다.'),
            .matches(
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                '이메일 형식으로 입력해주세요.'
            ),
        // 비밀번호
        user_pw: yup
            .string()
            .required('비밀번호를 입력해주세요.')
            // .min(10, '10자 이상의 비밀번호만 사용할 수 있습니다')
            // .max(15, '최대 15자 까지만 가능합니다')
            // .matches(
            //     /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{10,20}$/,
            //     '영어, 숫자, 특수문자로 조합된 비밀번호만 사용가능합니다.'
            // )
    });
    const {
        register,
        handleSubmit,
        handleBlur,
        setError,
        watch,
        formState: { errors, isSubmitted, isSubmitting, isDirty },
        // isSubmitting 은 양식 제출 중 disabled 처리 하게 함.
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema),
        defaultValues: { // 초기값 설정
            // id: '',
            // age: '',
        }
    });


    const onError = (errors) => {
        console.log(errors);
    };


    return(
        <>
            <div className="login_area">
                <div className="login_layout">
                    <form name="loginForm" id="loginForm" onSubmit={handleSubmit(loginSubmit, onError)}>
                        <div className="login_box">
                            <h2>로그인</h2>
                            <div className="input_box">
                                <label htmlFor="user_id">이메일</label>
                                <input id="user_id" type="text" placeholder="your@example.com" {...register('user_id')}/>
                                {errors.user_id && <p className="tip">{errors.user_id.message}</p>}
                            </div>
                            <div className="input_box">
                                <label htmlFor="user_pw">비밀번호</label>
                                <input id="user_pw" type="password" placeholder="비밀번호" {...register('user_pw')}/>
                                {errors.user_pw && <p className="tip">{errors.user_pw.message}</p>}
                            </div>
                            <div className="btn_box">
                                <button type="button">비밀번호 재설정 &gt;</button>
                                <button className="co1">로그인 &gt;</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;