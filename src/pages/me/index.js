import styles from "./me.module.css";
import { StroiesContent } from "./stories";
import { ListsContent } from "./lists";
import { useState } from "react";
export default function () {
    const [clickIndex, setClickIndex] = useState(0);
    const Click = (index) => {
        setClickIndex(index);
    }
    return (
        <div>
            {/* 头部区 */}
            <Top ClickCallBack={Click} />
            {/* 内容区 */}
            <div>
                <Content index={clickIndex} />
            </div>
        </div>
    )
}

function Top({ ClickCallBack }) {
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>{'user.username'}</h1>
                    </div>
                </div>
                <div className={styles.topFlex}>
                    <div className={styles.topBottom}
                        onClick={() => ClickCallBack(0)}
                    >
                        文章
                    </div>
                    <div className={styles.topBottom}
                        onClick={() => ClickCallBack(1)}
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

//给我获取数据！
export async function getServerSideProps(req){
    
    console.log(req);
}