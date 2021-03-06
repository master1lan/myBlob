import styles from "./me.module.css";
import { StroiesContent } from "./stories";
import { ListsContent } from "./lists";
import { useState, memo } from "react";

import { useSelector } from "react-redux";
import { selectUserInfo } from "@features/user";
import { useFetchPublishBlobs, useFetchLists } from "@utils/fetchData";
import { middlewareWithLogin } from '@utils/tools';
import { UserInfo } from "@components/meinfo";
import {NeverDoComponent } from "@components/default";

const contentList_title = ['文章', '收藏', '私信', '消息', '个人信息'];
const contentList_content = [
    <StroiesContent />,
    <ListsContent />,
    <NeverDoComponent>你还没接收到私信哦</NeverDoComponent>,
    <NeverDoComponent>你还没有接收到信息哦</NeverDoComponent>,
    <UserInfo />
];

export default function Index() {
    const [clickIndex, setClickIndex] = useState(0);
    useFetchPublishBlobs();
    useFetchLists();
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




//如果不进行ssg渲染则nextjs将会认为这是一个静态页面，只将渲染一次！
export const getServerSideProps=middlewareWithLogin;