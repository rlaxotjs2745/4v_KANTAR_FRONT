import React from "react";
import {Link} from "react-router-dom";

const DictionaryEntity = ({entity}) => {


    return (
        <tr>
            <td>{entity.idx_dictionary}</td>
            <td>{entity.title}</td>
            <td><div className="co2">{entity.dic_type === 0 ? '기본사전' : '사용자 사전'}</div></td>
            <td>{entity.dic_count}</td>
            <td>{entity.create_dt}</td>
            <td style={{textAlign:"center"}}>
                <Link to={`/dictionary_update/${entity.idx_dictionary}`} className="co1">수정</Link>
                <button type="button" className="co3">삭제</button>
            </td>
        </tr>
    )
}

export default DictionaryEntity;