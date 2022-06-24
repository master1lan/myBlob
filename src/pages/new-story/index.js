import MarkDown from '@utils/markdown';
import LOT from "@components/leftOrTop";
import { useRef, useState } from 'react';
import styles from './index.module.css';
import { HTMLToString } from '@utils/markdown';
import { useRouter } from "next/router";
import api from "@utils/api";
import message from '@utils/message';
import {  useSelector } from "react-redux";
import {selectUserInfo} from "@features/user";
import Cookies from 'js-cookie';


async function save({ username, title, content, description }) {
    if(!description||!content||description.length<40){
        message.info('字数太少，未达到发表要求');
        return null;
    }
    if (!username || !title || !content || !description) {
        //报错
       message.error('发生错误！');
        return null;
    }
    let ans = await fetch(api.articleSave, {
        method: "POST",
        body: JSON.stringify({ username, title, content, description,status:'publish' }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization':Cookies.get('jwt'),
        }
    });
    let json = await ans.json();
    return json._id;
}



export default function Index() {
    const contentRef = useRef('');
    const titleRef = useRef('');
    const user=useSelector(selectUserInfo);
    const router = useRouter();
    const onClick = async() => {
        const description = HTMLToString(contentRef.current.getDom().getElementsByTagName('p'));
        const res=await save({
            title: titleRef.current.value,
            content: contentRef.current.getText(),
            username: user.username,
            description: description
        });
        if(res){
            router.push(`/blob/${res}`)
        }
    }
    return (
        <>
            <aside className={styles.top}>
                <LOT clickCallBack={onClick} />
            </aside>
            <main className={styles.mainmain}>
                <main className={styles.main}>
                    <input placeholder='请输入标题' className={styles.input} ref={titleRef} />
                    <section className={styles.section}>
                        <MarkDown ref={contentRef} />
                    </section>
                </main>
            </main>
        </>
    )
}