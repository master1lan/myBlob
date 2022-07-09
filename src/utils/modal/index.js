import { memo, useEffect } from "react";
import styles from "./modal.module.css";
import { createPortal } from 'react-dom';


export const __UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT = (props) => {
    const { children, visible, closeModal, ...resProps } = props;
    function handleClick(event) {
        //点击蒙层本身时关闭模态框，点击模态框内容时不关闭
        event.stopPropagation();
        // event.nativeEvent.stopImmediatePropagation();
        if (event.target === event.currentTarget) {
            closeModal();
        };
    };
    let modal;
    (typeof document !== 'undefined') && (
        modal = createPortal(
            <div>
                <div
                    {...resProps}
                    className={styles.modal}
                    onClick={handleClick}
                >
                    {children}
                </div>
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

//阻止默认行为
function preventDefault(e) {
    e.preventDefault();
}

function enableScroll() {
    const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });

}

function disableScroll() {
    const wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, { passive: false }); // modern desktop
    window.addEventListener("touchmove", preventDefault, { passive: false }); // mobile
}




export default memo(function Modal(props) {
    const { isNoScroll = false, children, ...resProps } = props;
    useEffect(() => {
        isNoScroll && disableScroll();
        return () => isNoScroll && enableScroll();
    }, [isNoScroll]);
    return (
        <__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT
            {...resProps}
        >
            {children}
        </__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT>
    )
});