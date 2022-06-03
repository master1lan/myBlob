import { ActionButton } from "@components/nav";
import styles from "./stories.module.css";

export default function () {
    return (
        <div>
            {/* 这里是上面 */}
                <Top />
            {/* 这里是内容区 */}
            <div>
                <StroiesContent />
            </div>
        </div>
    )
}


function Top() {
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>Your stories</h1>
                    </div>
                    <div className={styles.topRightWrapper}>
                        <ActionButton message="Write a story" />
                        <ActionButton message="Import a story" />
                    </div>
                </div>
                <div className={styles.topFlexCenter}>
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

export function StroiesContent(){
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
        <div className={styles.articleWrapper}>
            <div className={styles.articleH3Wrapper}>
                <h3 className={`${styles.h3} ${styles.title}`}>
                    这里显示文字草拟标题
                </h3>
                <div className={styles.h3Margin}>
                    <h3 className={`${styles.h3} ${styles.content}`}>
                        这里写文章的前面的内容
                    </h3>
                </div>
            </div>
        </div>
    )
}