import { ActionButton } from "@components/nav";
import styles from "./stories.module.css";
import Link from "next/Link";
import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserBlobsPublish, selectUserBlobDraft } from "@features/user";
import { useFetchDraftBlobs,useFetchPublishBlobs } from "@utils/fetchData";
export default function () {
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    useFetchDraftBlobs();
    useFetchPublishBlobs();
    return (
        <div>
            {/* 这里是上面 */}
            <TOPMemo setIndex={setIndex} />
            {/* 这里是内容区 */}
            <div>
                {index === 0 ? <StoriesMemo /> : <DraftMemo />}
            </div>
        </div>
    )
}

const TOPMemo = memo(({ setIndex }) => <Top setIndex={setIndex} />);
function Top({ setIndex }) {
    const ClickFunc = (index) => () => setIndex(index);

    const drafts = useSelector(selectUserBlobDraft);
    const publishs = useSelector(selectUserBlobsPublish);
    return (
        <div className={styles.top}>
            <div >
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>Your stories</h1>
                    </div>
                    <div className={styles.topRightWrapper}>
                        <ActionButton message="Write a story" href="/new-story" />
                        <ActionButton message="Import a story" />
                    </div>
                </div>
                <div className={styles.topFlexCenter}>
                    <div className={styles.topBottom} onClick={ClickFunc(0)}>
                        {publishs.length}篇已发布
                    </div>
                    <div className={styles.topBottom} onClick={ClickFunc(1)}>
                        {drafts.length}篇草稿
                    </div>
                </div>
            </div>
        </div>
    )
}

const DraftMemo = memo(() => <DraftContent />);

function DraftContent() {
    const lists = useSelector(selectUserBlobDraft);
    return (
        <div>
            {lists.map(item => <Article key={item._id} title={item.title + '1231231'} description={item.description} _id={item._id} />)}
        </div>
    )
}

const StoriesMemo = memo(() => <StroiesContent />);

export function StroiesContent() {
    const lists = useSelector(selectUserBlobsPublish);
    return (
        <div>
            {lists.map(item => <Article key={item._id} title={item.title} description={item.description} _id={item._id} />)}
        </div>
    )
}

//草稿组件
function Article({ title = '标题丢失', description = '描述丢失', _id='/' }) {
    return (
        <div className={styles.articleWrapper}>
            <Link href={`/blob/${_id}`} >
                <div className={styles.articleH3Wrapper}>
                    <h3 className={`${styles.h3} ${styles.title}`}>
                        {title}
                    </h3>
                    <div className={styles.h3Margin}>
                        <h3 className={`${styles.h3} ${styles.content}`}>
                            {description}
                        </h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}

