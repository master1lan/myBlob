import MarkDown from '@utils/markdown';
import LOT from "@components/leftOrTop";
import { useRef, useState } from 'react';
import styles from './index.module.css';
import { HTMLToString } from '@utils/markdown';
import { useRouter } from "next/router";
import api from "@utils/api";
import message from '@utils/message';
import {  useSelector } from "react-redux";
import {selectUserInfo} from "@features/user/userSlice";
import Cookies from 'js-cookie';


async function save({ username, title, content, description }) {
    if (!username || !title || !content || !description) {
        //报错
       message.error('发生错误！');
        return;
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



export default function () {
    const contentRef = useRef('');
    const titleRef = useRef('');
    const [click, setclick] = useState(false);
    const user=useSelector(selectUserInfo);
    const router = useRouter();
    const onClick = () => {
        const description = HTMLToString(contentRef.current.getDom().getElementsByTagName('p'));
        save({
            title: titleRef.current.value,
            content: contentRef.current.getText(),
            username: user.username,
            description: description
        }).then(res => router.push(`/blob/${res}`));
        setclick(true);
    }
    return (
        <>
            <aside className={styles.top}>
                <LOT clickCallBack={!click ? onClick : null} />
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