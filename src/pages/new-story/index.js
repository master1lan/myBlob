import MarkDown from '@utils/markdown';
import LOT from "@components/leftOrTop";
import { useRef,useState } from 'react';
import styles from './index.module.css';
// import { HTMLToString } from '@utils/markdown';


async function save({username,title,content,description}){
    if(!username||!title||!content||!description){
      //报错
      console.error('err');
      return;
    }
    // const result=await fetch('http://localhost:7001/api/blob/save',{
    //   method:"POST",
    //   body:JSON.stringify({username,title,content,description}),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
}



export default function () {
    const contentRef = useRef('');
    const titleRef = useRef('');
    const [click,setclick]=useState(false);
    const onClick = () =>{
        // console.log({title:titleRef.current.value,content:contentRef.current.getText()});.getElementByTagName('p')
        // console.log(HTMLToString(contentRef.current.getDom().getElementsByTagName('p')));
        // const description=HTMLToString(contentRef.current.getDom().getElementsByTagName('p'));
        save({
            title:titleRef.current.value,
            content:contentRef.current.getText(),
            username:"saber",
            description:description
        })
        setclick(true);
    }
    return (
        <>
            <aside className={styles.top}>
                <LOT clickCallBack={!click?onClick:null} />
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