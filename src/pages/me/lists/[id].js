import { UserLOGO } from "@components/nav";
import api from "@utils/api";
import styles from "./lists.module.css";
import Article from "@components/article";
export default function Index({ data }) {
    return (
        <div>
            {/* 这里是上部 */}
            <div className={styles.topLALA}>
                <div className={styles.top}>
                    <UserLOGO height={50} />
                    <div>
                        <p>saber</p>
                        <p>5 stroies</p>
                    </div>
                </div>
                <div>read List </div>
            </div>
            {data?.map(item =>
                <Article 
                key={item._id}
                // content={item.description}
                title={item.title}
                username={item.username}
                _id={item._id}
                time={item.last_edit_time}
                />
            )}
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
        props: { data: res.data }
    };
}


