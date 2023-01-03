import React from "react";


const FILE_SIZE_LIMIT = 100 * 1024 * 1024;  // 100MB

class FileDropzone extends React.Component {

    state = {
        fileName: '',
        file:null
    }

    handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.size <= FILE_SIZE_LIMIT && file.name.endsWith('.csv')) {
            this.setState({ fileName: file.name });
            this.setState({ file: file });
            this.props.onFileDrop(file);
        } else if(file.size >= FILE_SIZE_LIMIT) {
            alert(`파일 크기는 최대 100MB를 넘을 수 없습니다.`)
            this.setState({ isDragging: false });
        } else {
            alert(`.csv 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.`)
            this.setState({ isDragging: false });
        }
    }


    handleFileSelect = (e) => {
        e.preventDefault();
        const file = e.target.files[0];

        if (file.size <= FILE_SIZE_LIMIT && file.name.endsWith('.csv')) {
            this.setState({ fileName: file.name });
            this.setState({ file: file });
            this.props.onFileDrop(file);
        } else if(file.size >= FILE_SIZE_LIMIT) {
            alert(`파일 크기는 최대 100MB를 넘을 수 없습니다.`)
            this.setState({ isDragging: false });
        } else {
            alert(`.csv 포맷 파일이 맞는지 확인 후 다시 업로드를 시도해주세요.`)
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
                    Drag and drop files here or upload
                </div>
                <input
                    type="file"
                    ref={(input) => this.fileInput = input}
                    style={{ display: 'none' }}
                    onChange={this.handleFileSelect}
                />
                {this.state.fileName && (
                    <p>File name: {this.state.fileName}</p>
                )}
            </>

        );
    }
}

export default FileDropzone;