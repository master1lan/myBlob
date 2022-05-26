import MarkDown from './markdown';
import { useRef } from 'react';



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



export default function Page() {
  const contentRef = useRef('');
  const titleRef=useRef('');
  const onClick = () => {
    save({
      title:titleRef.current.value,
      content:contentRef.current.getText(),
      username:"saber"
    })
  }
  return (
    <>
      <header
        style={{ overflow: "hidden" }}
      ><nav>
          {/* 这里写logo等玩意 */}
          <div style={{ float: 'left', width: "200px", height: "100px", backgroundColor: "black" }}></div>
          <div style={{ float: 'right', width: "200px", height: "100px", backgroundColor: "pink" }}>
            <input type='submit' onClick={onClick} value="查看" />
          </div>
          <div style={{ height: "100px", margin: "0 auto", backgroundColor: "skyblue" }}></div>
        </nav>
      </header>
      <main>
        <input placeholder='请输入标题' style={{
          display: "block", boxSizing: "border-box",
          width: "100%",height:'48px',border:"1px solid skyblue",
          padding:"8px 16px",fontSize:"1.5rem",borderRadius:".3rem",
          margin:"3rem 0 1rem ",
        }} ref={titleRef} />
        <nav style={{height:"50px",display:"flex"}}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        </nav>
        <section style={{padding:"0 25px"}}>
          <MarkDown ref={contentRef} />
        </section>
      </main>
    </>

  )
}


