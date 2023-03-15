import React from "react";
import {toast} from "react-toastify";

const CustomToastWithLink = (props) => {
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
                props.link ? <a href={props.link}>[바로가기]</a> : null
            }
        </div>
    )
}

const FILE_SIZE_LIMIT = 5000 * 1024;  // 5mb

class FileDropzone extends React.Component {


    state = {
        fileName: '',
        file:null
    }

    handleDrop = (e) => {
        const toastNoticeError = (text, link) => toast.error(<CustomToastWithLink toastType='error' text={text} link={link}/>); // 빨간색(실패)

        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.size <= FILE_SIZE_LIMIT && file.name.endsWith('.csv')) {
            this.setState({ fileName: file.name });
            this.setState({ file: file });
            this.props.onFileDrop(file);
        } else if(file.size >= FILE_SIZE_LIMIT) {
            toastNoticeError('파일 크기는 최대 5mb를 넘을 수 없습니다.')
            this.setState({ isDragging: false });
        } else {
            toastNoticeError('.csv (UTF-8 형식) 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.')
            this.setState({ isDragging: false });
        }
    }



    handleFileSelect = (e) => {

        e.preventDefault();
        const file = e.target.files[0];
        const toastNoticeError = (text, link) => toast.error(<CustomToastWithLink toastType='error' text={text} link={link}/>); // 빨간색(실패)

        if (file.size <= FILE_SIZE_LIMIT && file.name.endsWith('.csv')) {
            this.setState({ fileName: file.name });
            this.setState({ file: file });
            this.props.onFileDrop(file);
        } else if(file.size >= FILE_SIZE_LIMIT) {
            toastNoticeError('파일 크기는 최대 5mb를 넘을 수 없습니다.')
            this.setState({ isDragging: false });
        } else {
            toastNoticeError('.csv (UTF-8 형식) 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.')
            this.setState({ isDragging: false });
        }
    }

    handleDragEnter = (e) => {
        this.setState({ isDragging: true });
    }

    handleDragLeave = (e) => {
        this.setState({ isDragging: false });
    }

    handleDragOver = (e) => {
        e.preventDefault();
    }

    render() {


        const dropzoneClass = this.state.isDragging ? 'dropzone dragging' : 'dropzone';

        return (
            <>
                <div
                    className={dropzoneClass}
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onClick={() => this.fileInput.click()}
                >
                    {this.state.fileName ? (
                        <p>File name : {this.state.fileName}</p>
                    ) : (
                        <>Drag and drop files here or upload</>
                    ) }
                </div>
                <input
                    type="file"
                    ref={(input) => this.fileInput = input}
                    style={{ display: 'none' }}
                    onChange={this.handleFileSelect}
                />

            </>

        );
    }
}

export default FileDropzone;