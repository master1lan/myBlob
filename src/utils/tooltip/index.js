import { useClientRect, usePlacement } from "@utils/hooks";
import {__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT} from "@utils/modal";

import React, { useRef } from "react";

export default function Tooltip(props) {
    const { children, ...resProps } = props;
    const triggerEl=useRef(null);
    // const 
    return (
        <>
        <__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT
            {...resProps}
        >
            <Positon
            triggerRef={triggerEl}
            >
            {children}
            </Positon>
        </__UNSAFE__Modal__DO_NOT_USE_IN_PRODUCT>
        </>
    )
}


const Positon=({triggerRef,children,...resProps})=>{
    const triggerRect=useClientRect(triggerRef);
    usePlacement(triggerRect,'LR');
    return(
        <div
        {...resProps}
        >
            {children}
        </div>
    )
}