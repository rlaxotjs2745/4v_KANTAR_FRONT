import { toast } from 'react-toastify';

const CustomToastWithLink = (props) => {
    //
    // const dictionaryDelete = () => {
    //     if(props.del === 'dictionary'){
    //
    //     }
    // }

    return(
        <div className='toast_flex'>
            <div>
                {
                    props.toastType === 'normal' ? <img src={process.env.PUBLIC_URL + '/assets/image/ico_notice_normal.svg'}/> :
                        props.toastType === 'success' ? <img src={process.env.PUBLIC_URL + '/assets/image/ico_notice_success.svg'}/> :
                            props.toastType === 'error' ? <img src={process.env.PUBLIC_URL + '/assets/image/ico_notice_error.svg'}/> :
                                props.toastType === 'warning' ? <img src={process.env.PUBLIC_URL + '/assets/image/ico_notice_warning.svg'}/> : null
                }
                <span> {props.text}</span>
            </div>
            {
                props.link ? <a href={props.link}>[바로가기]</a> : null
            }
            {
                props.del ? <button onClick={props.del} className="co1" type="button">[삭제하기]</button> : null
            }
        </div>
    )
}

export function useToastAlert() {

    const toastNoticeInfo = (text, link, del) => toast.info(<CustomToastWithLink toastType='normal' text={text} link={link} del={del}/>); // 파란색(기본)

    const toastNoticeSuccess = (text, link, del) => toast.success(<CustomToastWithLink toastType='success' text={text} link={link} del={del}/>); // 초록색(성공)

    const toastNoticeError = (text, link, del) => toast.error(<CustomToastWithLink toastType='error' text={text} link={link} del={del}/>); // 빨간색(실패)

    const toastNoticeWarning = (text, link, del) => toast.warning(<CustomToastWithLink toastType='warning' text={text} link={link} del={del}/>); // 노란색(경고 or 알림)

    return {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    };
}