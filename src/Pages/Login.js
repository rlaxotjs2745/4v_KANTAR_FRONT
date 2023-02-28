import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {SERVER_URL} from "../Util/env";
import axios from 'axios';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {useToastAlert} from "../Util/toastAlert";

const Login = () => {

    const {
        toastNoticeSuccess,
        toastNoticeError,
    } = useToastAlert();

    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);

    const loginSubmit = (data) => {
        axios.post(SERVER_URL + 'user/login', {'user_id' : data.user_id, 'user_pw' : data.user_pw}).then(res => {
            console.log(res)
            if(res.data.success === "0"){
                toastNoticeError(res.data.msg)
            } else if(res.data.success === '1') {
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
            .matches(
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                '이메일 형식으로 입력해주세요.'
            ),
        // 비밀번호
        user_pw: yup
            .string()
            .required('비밀번호를 입력해주세요.')
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(formSchema)
    });

    const onError = (errors) => {
        console.log(errors);
    };

    const findPw = (data) => {
        let loginForm = document.querySelector("#loginForm")

        console.log(loginForm.user_id.value, '클릭 시 데이터')

        axios.post(SERVER_URL + 'user/find_pw', {'user_id' : loginForm.user_id.value}).then(res => {
            console.log(res)
            if(res.data.success === "0"){
                toastNoticeError(res.data.msg)
            } else if(res.data.success === '1') {
                toastNoticeSuccess(res.data.msg)
            }
        })
            .catch((error)=> {
                console.log(error)
            })
    }


    return(
        <>
            <div className="login_area">
                <div className="login_layout">
                    <form name="loginForm" id="loginForm" onSubmit={handleSubmit(loginSubmit, onError)}>
                        <div className="login_box">
                            <h2>로그인</h2>
                            <div className="input_box">
                                <label htmlFor="user_id">이메일</label>
                                <input id="user_id" name="user_id" type="text" placeholder="your@example.com" {...register('user_id')}/>
                                {errors.user_id && <p className="tip">{errors.user_id.message}</p>}
                            </div>
                            <div className="input_box">
                                <label htmlFor="user_pw">비밀번호</label>
                                <input id="user_pw" name="user_pw" type="password" placeholder="비밀번호" {...register('user_pw')}/>
                                {errors.user_pw && <p className="tip">{errors.user_pw.message}</p>}
                            </div>
                            <div className="btn_box">
                                <button onClick={findPw} type="button">비밀번호 재설정 &gt;</button>
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