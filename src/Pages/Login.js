import * as React from 'react';

const Login = () => {
    return(
        <>
            <div className="login_area">
                <div className="login_layout">
                    <form>
                        <div className="login_box">
                            <h2>로그인</h2>
                            <div className="input_box">
                                <label htmlFor="user_id">이메일</label>
                                <input id="user_id" type="text" placeholder="your@example.com"/>
                            </div>
                            <div className="input_box">
                                <label htmlFor="user_pw">비밀번호</label>
                                <input id="user_pw" type="password" placeholder="비밀번호"/>
                            </div>
                            <div className="btn_box">
                                <button>비밀번호 재설정 ></button>
                                <button className="co1">로그인 ></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login;