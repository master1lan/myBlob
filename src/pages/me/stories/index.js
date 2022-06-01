import { ActionButton } from "@components/nav";
import styles from "./stories.module.css";

export default function () {
    return (
        <div>
            {/* 这里是上面 */}
                <Top />
            {/* 这里是内容区 */}
            <div>
                <Content />
            </div>
        </div>
    )
}


function Top() {
    return (
        <div className={styles.top}>
            <div style={{
            }}>
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>Your stories</h1>
                    </div>
                    <div className={styles.topRightWrapper}>
                        <ActionButton message="Write a story" />
                        <ActionButton message="Import a story" />
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    padding: "2px 0",
                    overflowY: "hidden",
                    alignItems: "center",

                }}>
                    <div className={styles.topBottom}>
                        0篇草稿
                    </div>
                    <div className={styles.topBottom}>
                        0篇已发布
                    </div>
                </div>
            </div>
        </div>
    )
}

function Content(){
    return(
        <div>
            <Article />
            <Article />
            <Article />
            <Article />
        </div>
    )
}

//草稿组件
function Article(){
    return(
        <div style={{
            padding:"20px 0",
            borderBottom:"1px solid rgb(230,230,230)",

        }}>
            <div style={{
                overflowWrap:"break-word",
                wordBreak:"break-word",
            }}>
                <h3 style={{
                    WebkitLineClamp:"2",
                    maxHeight:"40px",
                    display:"-webkit-box",
                    textOverflow:"ellipsis",
                    overflow:"hidden",
                    color:"rgb(41,41,41)",
                    lineHeight:"20px"
                }}>
                    这里显示文字草拟标题
                </h3>
                <div style={{
                    marginTop:"4px",
                }}>
                    <h3 style={{
                        WebkitLineClamp:"2",
                        maxHeight:"40px",
                        display:"-webkit-box",
                        textOverflow:"ellipsis",
                        overflow:"hidden",
                        color:"rgb(117,117,117)",
                        lineHeight:"20px"
                    }}>
                        这里写文章的前面的内容
                    </h3>
                </div>
            </div>
        </div>
    )
}