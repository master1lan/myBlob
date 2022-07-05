import { UserLOGO, Favor } from "@components/nav";
import Link from "next/link";
import styles from "./article.module.css";
import { selectUserLists } from "@features/user";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { useOnClickOutside } from "@utils/hooks";
export default function Index({ title, username, content, _id, time }) {
    return (
        <div className={styles.article}>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div>
                        <UserLOGO />
                    </div>
                    <div>
                        {username}
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
                {/* <Link href={`/blob/${_id}`} > */}
                <a>
                    <div><h2 className={styles.h2}>{title}</h2></div>
                    <div><p className={styles.content}>{content}</p></div>
                </a>
                {/* </Link> */}
                <div className={styles.underlineWrapper}>
                    <div style={{
                        borderRadius: "100px",
                        backgroundColor: "rgb(242,242,242)"
                    }}>
                        JavaScript
                    </div>
                    <div>
                        3 min read
                    </div>
                    <div>
                        <FavorBlob _id={_id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
//收藏组件
function FavorBlob({ _id }) {
    const [isvisible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));
    return (
        <div style={{
            cursor: "pointer",
            position: "relative",
            fontSize: "16px",
        }} onClick={(event) => {
            event.nativeEvent?.stopImmediatePropagation();
            setVisible(true);
        }}>
            <Favor />
            {isvisible && <AddFavor />}
        </div>
    )
}

//收藏夹
function AddFavor() {
    const lists = useSelector(selectUserLists);
    return (
        <div className={styles.addFavorWrapper}>
            <p>添加至收藏夹</p>
            <div className={styles.addFavor}>
                {lists.map(item => <div
                    className={styles.addFavorItem}
                    key={item._id}>
                    <ClickFavor title={item.title} />
                </div>)}
            </div>
            <div>Create new list</div>
        </div>
    )
}

function ClickFavor({ title }) {
    return (
        <>
            <input type="checkbox" style={{
                width: "20px"
            }} checked={true} />
            <p className={styles.ClickFavorP}>{title}</p>
        </>
    )
}