import dynamic from 'next/dynamic';
const Editor=dynamic(()=>import("rich-markdown-editor"),{ssr:false});
import {useState,forwardRef,useImperativeHandle} from 'react';


const onChange=(setText)=>{
    return  function(text){
        setText(text);
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
    return(
        <Editor 
        onChange={onChange(setText)}
        defaultValue={text}
        dark={mode=='dark'}
        readOnly={readOnly||false}
        />
    )
})

export default FixedMarkDown;