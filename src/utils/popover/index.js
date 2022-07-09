import { __UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT } from "@utils/modal";
import { useState, useRef, cloneElement,forwardRef } from "react";
import { usePlacement } from "@utils/hooks";
import styles from "./popover.module.css";

export default function Popover({ content, children, ...resProps }) {
    const [visible, setVisible] = useState(false);
    const PopRef = useRef(null);
    const handleClick = () => {
        setVisible(!visible);
    }
    return (
        <>
            <div
                className={styles.popover}
                {...resProps}
                onClick={handleClick}
                ref={PopRef}
            >
                {children}
                <__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT
                    visible={visible}
                    closeModal={handleClick}
                >
                    <__POPOVER__
                        className={styles.popoverWrapper}
                        PopRef={PopRef}>
                        {content}
                    </__POPOVER__>
                </__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT>

            </div>
        </>
    )
}


function __POPOVER__({ children, PopRef,...resProps }) {
    const contentRef=useRef(null);
    const distance = usePlacement(PopRef,contentRef);
    return (
        <div
        ref={contentRef}
            style={distance}
            {...resProps}
        >
            {children}
        </div>
    )
}