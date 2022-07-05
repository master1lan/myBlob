import { useEffect } from "react"

/**
 * hook封装
 */



export const useOnClickOutside=(ref,callback)=>{
    const handler=(event)=>{
        if(!ref.current?.contains(event.target)){
            callback();
        }
    }
    useEffect(()=>{
        document.addEventListener("click",handler);
        return ()=>document.removeEventListener("click",handler);
    },[callback,ref]);
}