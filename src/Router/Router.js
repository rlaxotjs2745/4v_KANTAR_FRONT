import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutType2 from "../Layout/LayoutType2";
import LayoutType1 from "../Layout/LayoutType1";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import Error from "../Pages/404";
import PublickRoute from "./PublickRoute";
import PrivateRoute from "./PrivateRoute";
import FileUpload from "../Pages/FileUpload";
import Report from "../Pages/Report";


const Routers = () => {
    return (
        <Router>
            <Routes>
                {/* type1 푸터 헤더 있는 버전 */}
                {/* PrivateRoute 안에는 로그인 해야 접근 가능, 로그인 안되어 있으면 /login으로 이동*/}
                <Route path="/" element={<PrivateRoute><LayoutType1/></PrivateRoute>}>
                    {/*<Route path="*" element={<Error/>}/>*/}
                    <Route index element={<Home/>}/>
                    <Route path="/report" element={<Report/>} />
                    <Route path="/profile" element={<Profile/>} />
                </Route>
                <Route path="/" element={<PrivateRoute><LayoutType2/></PrivateRoute>}>
                    <Route path="/fileupload" element={<FileUpload/>} />
                </Route>
                {/* 로그인 되어 있으면 login 페이지가 아니라 /로 넘어가는 라우터 */}
                <Route path="/" element={<PublickRoute><LayoutType1/></PublickRoute>}>
                    {/*<Route path="/signup" element={<SignUp/>}/>*/}
                    {/*<Route path="/find_pw" element={<FindPW/>}/>*/}
                    {/* 404 페이지 */}
                    <Route path="*" element={<Error/>}/>
                </Route>
                {/* type2 푸터 헤더 없는 버전 */}
                {/* 로그인 되어 있으면 login 페이지가 아니라 /로 넘어가는 라우터 */}
                <Route path="/" element={<PublickRoute><LayoutType2/></PublickRoute>}>
                    <Route path="/login" element={<Login/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default Routers;