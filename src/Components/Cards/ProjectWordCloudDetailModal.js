import ReactWordcloud from "react-wordcloud";
import React, {useMemo} from "react";




const ProjectWordCloudDetailModal = ({
                                         handleModalClose5,
                                         options,
                                         words,
                                         cloudFilter,
                                         capture
                                     }) => {

    const WordCloud = ({ options, words }) => {
        return <ReactWordcloud options={options} words={words} />;
    };
    const MemoizedWordCloud = useMemo(() => WordCloud, [options, words]);


    return (
        <div className="word_cloud_detail">
            <div className="file_upload_area">
                <div className="head type2">
                    <h2>워드클라우드A02</h2>
                    <button onClick={handleModalClose5}>
                        <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_btn_delete.svg'}/>
                    </button>
                </div>
            </div>
            <div className="word_cloud_detail_content report_detail_area">
                <div className="input_box">

                    {cloudFilter && cloudFilter.length ?
                        <>
                            <label htmlFor="detail_filter">적용된 필터값</label>
                            <div className="filter_area">
                            {
                                cloudFilter.map(item =>(
                                    <>
                                        <div className="filter_box">
                                            <strong className="tit">
                                                {item.filter_type === 1 ? '화자' :
                                                    item.filter_type === 2 ? '챕터' :
                                                        item.filter_type === 3 ? '서브챕터' :
                                                            item.filter_type === 4 ? '질문' :
                                                                item.filter_type === 5 ? '키워드' : null
                                                }
                                            </strong>
                                            {item.filterDataArray.map(item => (
                                                <span className="keyword">{item.filter_data}</span>
                                            ))}
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                        </>
                     : <label htmlFor="detail_filter">적용된 필터가 없습니다.</label>
                    }
                </div>
                <div className="word_cloud_img_box" id="word_cloud_img_box">
                    {/*<ReactWordcloud options={options} words={words} />*/}
                    <MemoizedWordCloud options={options} words={words} />

                </div>
                <div className="btn_box">
                    <button className="no_ico cds--btn" onClick={capture}>이미지 다운로드</button>
                </div>

            </div>

        </div>
    )
}

export default ProjectWordCloudDetailModal;

