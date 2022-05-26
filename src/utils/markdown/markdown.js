import dynamic from 'next/dynamic';
const Editor=dynamic(()=>import("rich-markdown-editor"),{ssr:false});
import {useState,forwardRef,useImperativeHandle} from 'react';


const onChange=(setText)=>{
    return  function(text){
        setText(text);
    }
}


const FixedMarkDown=forwardRef(({content='',mode='light'},ref)=>{
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
        />
    )
})

export default FixedMarkDown;