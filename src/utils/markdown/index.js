import MarkDown from './markdown';
import { useRef } from 'react';
import styles from './markdown.module.css';


async function save({username,title,content}){
    if(!username||!title||!content){
      //报错
      console.error('err');
      return;
    }
    const result=await fetch('http://localhost:7001/api/blob/save',{
      method:"POST",
      body:JSON.stringify({username,title,content}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

export default function Page({onClickCallBack}) {
  const contentRef = useRef('');
  const titleRef=useRef('');
  const onClick = () => {
    onClickCallBack({title:titleRef.current.value,content:contentRef.current.getText()});
    // save({
    //   title:titleRef.current.value,
    //   content:contentRef.current.getText(),
    //   username:"saber"
    // })
  }
  return (
      <main className={styles.main}>
        <button onClick={onClick}>123</button>
        <input placeholder='请输入标题' className={styles.input} ref={titleRef} />
        <section style={{padding:"0 25px"}}>
          <MarkDown ref={contentRef} />
        </section>
      </main>
  )
}


export function HTMLToString(domList){
  let ans=[],size=0;
  for(let i=0,length=domList.length;i<length;i++){
    const str=domList[i].innerHTML.replaceAll(/(<br>|&lt;br&gt;)/g,'');
    ans.push(str);
    size+=str.length;
    if(size>300){
      break;
    }
  }
  return ans.join('').trim();
}