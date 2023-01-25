import React from "react";
import {Link} from "react-router-dom";

const MemberManagementEntity = ({user, isConfirmUser}) => {


    return (
        <tr>
            <td>{user.user_name}</td>
            <td>{user.user_id}</td>
            <td>{user.create_dt ? `${user.create_dt.split(' ')[0].replaceAll('-', '.')} ${user.create_dt.split(' ')[1].split(':')[0]}:${user.create_dt.split(' ')[1].split(':')[1]}` : null}</td>
            <td>{user.update_dt ? `${user.update_dt.split(' ')[0].replaceAll('-', '.')} ${user.update_dt.split(' ')[1].split(':')[0]}:${user.update_dt.split(' ')[1].split(':')[1]}` : null}</td>
            <td>
                {
                    isConfirmUser ? <Link to={`/member_update/${user.idx_user}`}>상세보기</Link> : null
                }
            </td>
        </tr>
    )
}

export default MemberManagementEntity;