import React from "react";

const DictionaryUpdateEntity = ({entity, deleteData, updateData, newData, isFirst}) => {

    return (
        <tr>
            <td><input className="dictionarydata_keyword"  onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword}/></td>
            <td><input className="dictionarydata_keyword01" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword01}/></td>
            <td><input className="dictionarydata_keyword02" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword02}/></td>
            <td><input className="dictionarydata_keyword03" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword03}/></td>
            <td><input className="dictionarydata_keyword04" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword04}/></td>
            <td><input className="dictionarydata_keyword05" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword05}/></td>
            <td><input className="dictionarydata_keyword06" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword06}/></td>
            <td><input className="dictionarydata_keyword07" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword07}/></td>
            <td><input className="dictionarydata_keyword08" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword08}/></td>
            <td><input className="dictionarydata_keyword09" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword09}/></td>
            <td><input className="dictionarydata_keyword10" onChange={(e) => updateData(entity.idx_dictionary_data, e)} type="text" placeholder="단어입력" defaultValue={entity.keyword010}/></td>
            <td className="absolute">
                <button onClick={() => deleteData(entity.idx_dictionary_data)}><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_delete.svg'}/></button>
                {
                    isFirst ? <button onClick={newData}><img src={process.env.PUBLIC_URL + '/assets/image/ico_table_add.svg'}/></button> : null
                }
            </td>
        </tr>
    )
}

export default DictionaryUpdateEntity;