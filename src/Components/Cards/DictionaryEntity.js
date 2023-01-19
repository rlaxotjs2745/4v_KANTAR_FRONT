import React from "react";
import {Link} from "react-router-dom";

const DictionaryEntity = ({entity, deleteDictionary, num}) => {


    return (
        <tr>
            <td>{num}</td>
            <td>{entity.title}</td>
            <td><div className="co2">{entity.dic_type === 0 ? '기본사전' : '사용자 사전'}</div></td>
            <td>{entity.dic_count}</td>
            <td>{entity.create_dt ? `${entity.create_dt.split(' ')[0].replaceAll('-', '.')} ${entity.create_dt.split(' ')[1].split(':')[0]}:${entity.create_dt.split(' ')[1].split(':')[1]}` : null}</td>
            <td style={{textAlign:"center"}}>
                <Link to={`/dictionary_update/${entity.idx_dictionary}`} className="co1">수정</Link>
                <button type="button" onClick={() => deleteDictionary(entity.idx_dictionary)} className="co3">삭제</button>
            </td>
        </tr>
    )
}

export default DictionaryEntity;