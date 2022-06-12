import { ActionButton } from "@components/nav";
import styles from "./stories.module.css";
import Link from "next/Link";
import Cookie from "js-cookie";
import api from "@utils/api";
import { useState, useEffect,memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserBlobsPublish, selectUserBlobDraft, setPublishBlobs, setDraftBlobs } from "@features/user/userSlice";

export default function () {
    const [index, setIndex] = useState(0);
    return (
        <div>
            {/* 这里是上面 */}
            {/* <Top setIndex={setIndex} /> */}
            <TOPMemo setIndex={setIndex} />
            {/* 这里是内容区 */}
            <div>
                {index===0?<StoriesMemo/>:<DraftMemo/>}
            </div>
        </div>
    )
}

const TOPMemo=memo(({setIndex})=><Top setIndex={setIndex} />,()=>true);
function Top({ setIndex }) {
    const ClickFunc = (index) => () => setIndex(index);
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
                    <div className={styles.topBottom} onClick={ClickFunc(0)}>
                        0篇已发布
                    </div>
                    <div className={styles.topBottom} onClick={ClickFunc(1)}>
                        0篇草稿
                    </div>
                </div>
            </div>
        </div>
    )
}

const DraftMemo=memo(()=><DraftContent />);

function DraftContent() {
    const lists = useSelector(selectUserBlobDraft);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userDraftedBlob, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {
            if(res.data.toString()!==lists.toString()){
                dispatch(setDraftBlobs(res.data));
            }
        });
    }, []);
    return (
        <div>
            {lists.map(item => <Article key={item._id} title={item.title+'1231231'} description={item.description} _id={item._id} />)}
        </div>
    )
}

const StoriesMemo=memo(()=><StroiesContent />);

export function StroiesContent() {
    const lists = useSelector(selectUserBlobsPublish);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch(api.userPublishedBlob, {
            headers: {
                'Authorization': Cookie.get('jwt')
            }
        }).then(res => res.json()).then(res => {
            if(res.data.toString()!==lists.toString()){
                dispatch(setPublishBlobs(res.data));
            };
        });
    }, []);
    return (
        <div>
            {lists.map(item => <Article key={item._id} title={item.title} description={item.description} _id={item._id} />)}
        </div>
    )
}

//草稿组件
function Article({ title = '标题丢失', description = '描述丢失', _id }) {
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

