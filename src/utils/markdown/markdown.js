import dynamic from 'next/dynamic';
// import Dante from 'Dante2';
// import Dante from "dante3";
const Editor=dynamic(()=>import("rich-markdown-editor"),{ssr:false});
import {useState,forwardRef,useImperativeHandle} from 'react';


const onChange=(setText)=>{
    return  function(data){
        setText(data);
    }
}


const FixedMarkDown=forwardRef(({content='',mode='light',readOnly=false},ref)=>{
    const [text,setText]=useState(content);
    useImperativeHandle(ref,()=>{
        return{
            getText(){
                return text;
            }
        }
    })
    // return(
    //     <Dante 
    //     onUpdate={onChange(setText)}
    //     // onChange={onChange(setText)}
    //     content={text}
    //     />
    // )
    return(
        <Editor 
        onChange={onChange(setText)}
        defaultValue={text}
        dark={mode==='dark'}
        readOnly={readOnly||false}
        />
    )
})


export default FixedMarkDown;