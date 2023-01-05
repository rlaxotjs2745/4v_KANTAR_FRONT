
const Modal = (props) => {
    const handleModalClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div className="dim" onClick={props.onClose}></div>
            <div className="modal_area" onClick={props.onClose}>
                <div className="modal_layout">
                    <div className="modal">
                        <div className={`modal_content ${props.in_fixed_btn}`} onClick={handleModalClick}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;