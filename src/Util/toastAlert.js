import { toast } from 'react-toastify';


const CustomToastWithLink = (props) => {

//props - text, link, del

//text: 토스트 모달에서 표출될 텍스트, type String
//link: 바로가기 버튼 클릭 시 이동할 url, type String(url)
//del : 버튼 클릭 시 실행될 콜백 함수, type function
//btnText : 버튼에 표출될 텍스트

    return(
        <div className='toast_flex'>
            <div>
                {
                    props.toastType === 'normal' ? <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_notice_normal.svg'}/> :
                        props.toastType === 'success' ? <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_notice_success.svg'}/> :
                            props.toastType === 'error' ? <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_notice_error.svg'}/> :
                                props.toastType === 'warning' ? <img alt="" src={process.env.PUBLIC_URL + '/assets/image/ico_notice_warning.svg'}/> : null
                }
                <span> {props.text}</span>
            </div>
            {
                props.link && props.btnText? <a href={props.link}>[{props.btnText}]</a> : props.link ? <a href={props.link}>[바로가기]</a> : null
            }
            {
                props.del && props.btnText ? <button onClick={props.del} className="co1" type="button">[{props.btnText}]</button> : props.del ? <button onClick={props.del} className="co1" type="button">[삭제하기]</button> : null
            }
        </div>
    )
}

export function useToastAlert() {

    const toastNoticeInfo = (text, link, del, btnText) => toast.info(<CustomToastWithLink toastType='normal' text={text} link={link} del={del} btnText={btnText}/>); // 파란색(기본)

    const toastNoticeSuccess = (text, link, del, btnText) => toast.success(<CustomToastWithLink toastType='success' text={text} link={link} del={del} btnText={btnText}/>); // 초록색(성공)

    const toastNoticeError = (text, link, del, btnText) => toast.error(<CustomToastWithLink toastType='error' text={text} link={link} del={del} btnText={btnText}/>); // 빨간색(실패)

    const toastNoticeWarning = (text, link, del, btnText) => toast.warning(<CustomToastWithLink toastType='warning' text={text} link={link} del={del} btnText={btnText}/>); // 노란색(경고 or 알림)

    return {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    };
}