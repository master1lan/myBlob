import MarkDown from '@utils/markdown/markdown';
import LOT from "@components/leftOrTop";
import { useRef } from 'react';
import styles from './index.module.css';




export default function () {
    const contentRef = useRef('');
    const titleRef = useRef('');
    const onClick = () =>{
        console.log({title:titleRef.current.value,content:contentRef.current.getText()});
    }
    return (
        <>
            <aside className={styles.top}>
                <LOT clickCallBack={onClick} />
            </aside>
            <main className={styles.mainmain}>
                <main className={styles.main}>
                    <input placeholder='请输入标题' className={styles.input} ref={titleRef} />
                    <section style={{ padding: "0 25px" }}>
                        <MarkDown ref={contentRef} />
                    </section>
                </main>
            </main>
        </>
    )
}