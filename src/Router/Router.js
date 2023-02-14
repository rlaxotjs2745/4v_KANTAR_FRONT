import React from "react";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
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
import ReportDetail from "../Pages/ReportDetail";
import Dictionary from "../Pages/Dictionary";
import DictionaryCreate from "../Pages/DictionaryCreate";
import DictionaryUpdate from "../Pages/DictionaryUpdate";
import MemberManagement from "../Pages/MemberManagement";
import MemberCreate from "../Pages/MemberCreate";
import MemberUpdate from "../Pages/MemberUpdate";
import UsageStatistics from "../Pages/UsageStatistics";
import ProjectDetail from "../Pages/ProjectDetail";
import FirstLogin from "../Pages/FirstLogin"
import ScrollToTop from "../Components/Layout/ScrollToTop";
import {useCookies} from "react-cookie";


const Routers = () => {


    return (
        <Router>
            <ScrollToTop/>
            <Routes>
                {/* type1 푸터 헤더 있는 버전 */}
                {/* PrivateRoute 안에는 로그인 해야 접근 가능, 로그인 안되어 있으면 /login으로 이동*/}
                <Route path="/" element={<PrivateRoute><LayoutType1/></PrivateRoute>}>
                    <Route index element={<Home/>}/>
                    <Route path="/project_detail/:idx" element={<ProjectDetail/>} />
                    {/*<Route path="/project_detail/:idx" element={<ProjectDetail2/>} />*/}
                    <Route path="/profile" element={<Profile/>} />

                    <Route path="/report" element={<Report/>} />
                    <Route path="/report_detail/:idx" element={<ReportDetail/>} />

                    <Route path="/dictionary" element={<Dictionary/>} />
                    <Route path="/dictionary_create" element={<DictionaryCreate/>} />
                    <Route path="/dictionary_update/:idx" element={<DictionaryUpdate/>} />
                    <Route path="/dictionary_detail/:idx" element={<DictionaryUpdate/>} />

                    <Route path="/member_management" element={<MemberManagement/>} />
                    <Route path="/member_create" element={<MemberCreate/>} />
                    <Route path="/member_update/:idx" element={<MemberUpdate/>} />

                    <Route path="/usage_statistics" element={<UsageStatistics/>} />
                </Route>
                <Route path="/" element={<PrivateRoute><LayoutType2/></PrivateRoute>}>
                    <Route path="/fileupload" element={<FileUpload/>} />
                </Route>
                {/* 로그인 되어 있으면 login 페이지가 아니라 /로 넘어가는 라우터 */}
                <Route path="/" element={<PublickRoute><LayoutType1/></PublickRoute>}>
                    {/*<Route path="/signup" element={<SignUp/>}/>*/}
                    {/*<Route path="/find_pw" element={<FindPW/>}/>*/}
                    {/* 404 페이지 */}
                    <Route path="/firstlogin/:fCode" element={<FirstLogin />} />
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