import {Form, Outlet} from "react-router-dom";
import Header from "../Components/Layout/Header";

const LayoutType1 = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}
export default LayoutType1;