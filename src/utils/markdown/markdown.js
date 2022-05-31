import dynamic from 'next/dynamic';
const Editor=dynamic(()=>import("rich-markdown-editor"),{ssr:false});
import {useState, useEffect,useRef,forwardRef,useImperativeHandle} from 'react';


const onChange=(setText,setEditDom,EditDom)=>{
    return  function(data){
        setText(data);
        if(!EditDom){
            setEditDom(document.getElementsByClassName('ProseMirror')[0]);
        }
    }
}


const FixedMarkDown=forwardRef(({content='',readOnly=false},ref)=>{
    const [text,setText]=useState(content);
    const [EditDom,setEditDom]=useState(null);
    const EditRef=useRef(null);
    useImperativeHandle(ref,()=>{
        return{
            getText(){
                return text;
            },
            getDom(){
                return EditDom;
            }
        }
    })
    useEffect(()=>{
        return ()=>setEditDom(null);
    },[]);
    return(
        <Editor 
        onChange={onChange(setText,setEditDom,EditDom)}
        defaultValue={text}
        readOnly={readOnly||false}
        headingsOffset={1}
        ref={EditRef}
        />
    )
})


export default FixedMarkDown;