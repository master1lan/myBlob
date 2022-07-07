import { memo } from "react";
import styles from "./modal.module.css";
import { createPortal } from 'react-dom';


const Modal = (props) => {
    const { children, visible, closeModal, ...resProps } = props;
    function handleClick(event) {
        //点击蒙层本身时关闭模态框，点击模态框内容时不关闭
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };
    let modal;
    (typeof document !== 'undefined') && (
        modal = createPortal(
            <div
                {...resProps}
                className={styles.modal}
                onClick={handleClick}
            >
                {children}
            </div>
            , document.body
        )
    );
    return (
        <>
            {visible && modal}
        </>
    )
}

export default memo(Modal);