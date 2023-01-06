import { toast } from 'react-toastify';

const CustomToastWithLink = (props) => {
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
                props.link === '' ? null : <a href={props.link}>[바로가기]</a>
            }
        </div>
    )
}

export function useToastAlert() {

    const toastNoticeInfo = (text, link) => toast.info(<CustomToastWithLink toastType='normal' text={text} link={link}/>); // 파란색(기본)

    const toastNoticeSuccess = (text, link) => toast.success(<CustomToastWithLink toastType='success' text={text} link={link}/>); // 초록색(성공)

    const toastNoticeError = (text, link) => toast.error(<CustomToastWithLink toastType='error' text={text} link={link}/>); // 빨간색(실패)

    const toastNoticeWarning = (text, link) => toast.warning(<CustomToastWithLink toastType='warning' text={text} link={link}/>); // 노란색(경고 or 알림)

    return {
        toastNoticeInfo,
        toastNoticeSuccess,
        toastNoticeError,
        toastNoticeWarning,
    };
}