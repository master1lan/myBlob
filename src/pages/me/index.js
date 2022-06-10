import styles from "./me.module.css";
import { StroiesContent } from "./stories";
import { ListsContent } from "./lists";
import { useState } from "react";
import { userLogin } from "@utils/context";
import { UserHome } from "@components/nav";
//不应该引入redux：
//个人页面主要就是发表的文章和收藏的内容
//引入redux后如何确保数据的一致？如果在其他页面发表了一篇文章或者收藏了一篇文章，那么这个逻辑该怎么写？
//所以应该在每次刷新页面时，都获取一次数据。
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
    const {user}=userLogin();
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>{user&&user.username}</h1>
                    </div>
                    <div><UserHome /></div>
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
// export async function getServerSideProps(req){
    
//     console.log(req);
// }