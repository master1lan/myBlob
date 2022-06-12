import styles from "./me.module.css";
import { StroiesContent } from "./stories";
import { ListsContent } from "./lists";
import { useState,memo } from "react";
import { UserHome } from "@components/nav";

import {  useSelector } from "react-redux";
import { selectUserInfo } from "@features/user/userSlice";

export default function () {
    const [clickIndex, setClickIndex] = useState(0);
    return (
        <div>
            {/* 头部区 */}
            {/* <Top setClickIndex={setClickIndex} /> */}
            <TOPMemo setClickIndex={setClickIndex} />
            {/* 内容区 */}
            <div>
                <Content index={clickIndex} />
            </div>
        </div>
    )
}

const TOPMemo=memo(({ setClickIndex })=><Top setClickIndex={setClickIndex}/>)
function Top({ setClickIndex }) {
    const user=useSelector(selectUserInfo);
    const ClickFunc=(index)=>()=>setClickIndex(index);
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>{user.username}</h1>
                    </div>
                    <div><UserHome /></div>
                </div>
                <div className={styles.topFlex}>
                    <div className={styles.topBottom}
                        onClick={ClickFunc(0)}
                    >
                        文章
                    </div>
                    <div className={styles.topBottom}
                        onClick={ClickFunc(1)}
                    >
                        收藏
                    </div>
                </div>
            </div>
        </div>
    )
}

function Content({ index = 0 }) {
    return (
        <>
            {index === 0 ? <StroiesContent /> : <ListsContent />}
        </>
    )
}
