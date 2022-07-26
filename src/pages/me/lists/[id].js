import { UserLOGO, Favor } from "@components/nav";
import api from "@utils/api";
import styles from "./lists.module.css";
import Article from "@components/article";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@features/user";

export default function Index({ username, data, title, last_edit_time, description }) {
    const {logoUrl} = useSelector(selectUserInfo);
    return (
        <div>
            {/* 这里是上部 */}
            <div className={styles.topLALA}>
                <div className={styles.top}>
                    <UserLOGO height={50} src={logoUrl} />
                    <div>
                        <p>{username}</p>
                        <div className={styles.topRight}>
                            <p>{data?.length} stroies</p>
                            <p>{last_edit_time}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
            {!data?.length && <NoList />}
            {data?.map(item =>
                <Article
                    key={item._id}
                    title={item.title}
                    username={item.username}
                    _id={item._id}
                    time={item.last_edit_time}
                />
            )}
        </div>
    )
}


function NoList() {
    return (
        <div className={styles.noList}>
            <div className={styles.noListContent}>
                <p>还没有收藏文章哦，在你想收藏的文章中点击
                    <Favor />
                    进行保存吧!</p>
            </div>
        </div>
    )
}


export async function getStaticPaths() {
    const resNoJSON = await fetch(api.userListsAll);
    const res = await resNoJSON.json();
    return {
        paths: Array.from(res, item => { return { params: { id: item._id } } }),
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const resNoJSON = await fetch(`${api.userdirectList}?listId=${params.id}`);
    const res = await resNoJSON.json();
    return {
        props: { ...res }
    };
}


