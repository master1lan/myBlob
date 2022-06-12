import styles from "./me.module.css";
import { StroiesContent } from "./stories";
import { ListsContent } from "./lists";
import { useState, memo } from "react";

import { useSelector } from "react-redux";
import { selectUserInfo } from "@features/user/userSlice";
import { useFetchPublishBlobs } from "@utils/fetchData";


const contentList_title = ['文章', '收藏', '私信', '消息', '个人信息'];
const contentList_content = [
    <StroiesContent />,
    <ListsContent />,
    <div>占位</div>,
    <div>消息占位</div>,
    <div>个人信息占位</div>
];

export default function () {
    const [clickIndex, setClickIndex] = useState(0);
    useFetchPublishBlobs();
    return (
        <div>
            {/* 头部区 */}
            <TOPMemo setClickIndex={setClickIndex} />
            {/* 内容区 */}
            <div>
                {contentList_content[clickIndex]}
            </div>
        </div>
    )
}

const TOPMemo = memo(({ setClickIndex }) => <Top setClickIndex={setClickIndex} />)
function Top({ setClickIndex }) {
    const user = useSelector(selectUserInfo);
    const ClickFunc = (index) => () => setClickIndex(index);
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>{user.username}</h1>
                    </div>
                </div>
                <div className={styles.topFlex}>
                    {
                        contentList_title.map((item, index) =>
                            <div key={index}
                                className={styles.topBottom}
                                onClick={ClickFunc(index)}>
                                {item}
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}




