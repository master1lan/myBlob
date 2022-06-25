import dynamic from 'next/dynamic';
const Editor = dynamic(() => import("rich-markdown-editor"), { ssr: false });
import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from "./edit.module.css";
import { blobUpdate,uploadImg } from '@utils/fetchData';
import { HTMLToString } from '@utils/tools';


const FixedEditPage = forwardRef(({ content = '', title = '', username }, ref) => {
    const [text, setText] = useState(content);
    const [timer,setTimer]=useState(null);
    const titleRef = useRef(null);
    const onChange = (data) => {
        return;
        setText(data);
        clearTimeout(timer);
        //直接丢到sessionStorage里面
        sessionStorage.setItem('draft',data());
        setTimer(setTimeout(blobUpdate, 5000,
            {
                username, title: titleRef.current.value,
                content: text, description: HTMLToString(document.getElementsByClassName('ProseMirror')[0]), status: 'draft'
            }));
    }
    useImperativeHandle(ref, () => {
        return {
            getText() {
                return {
                    username, title: titleRef.current.value,
                    content: text, description: HTMLToString(document.getElementsByClassName('ProseMirror')[0]), status: 'publish',
                    publish:true
                }
            },
            setTimer(){
                clearTimeout(timer);
                setTimer(null);
            }
        }
    });
    useEffect(() => {
        const draftText=sessionStorage.getItem('draft');
        draftText&&setText(draftText);
        return () => {
            clearTimeout(timer);
        }
    },[]);
    return (
        <>
            <input placeholder='请输入标题' className={styles.input} defaultValue={title} ref={titleRef} />
            <section className={styles.section}>
                <Editor
                    onChange={onChange}
                    defaultValue={text}
                    headingsOffset={1}
                    uploadImage={uploadImg}
                />
            </section>
        </>
    )
})


export default FixedEditPage;

export const Markdown = ({ content = '', readOnly = false }) => {
    return (
        <Editor
            defaultValue={content}
            readOnly={readOnly || false}
            headingsOffset={1}
        />
    )
}