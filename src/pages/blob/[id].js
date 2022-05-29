import Markdown from "@utils/markdown/markdown";
import styles from './index.module.css';
import { UserLOGO, AddLists } from "@components/nav";
export default function Post({ username, title, content }) {
    return (
        <>
            {/* 第一个框是作者的信息，包括作者的name，文章日期，阅读时长，作者其他平台链接，添加到收藏 */}
            <div className={styles.nameContainer}>
                {/* 左边的玩意 */}
                <div className={styles.leftContainer}>
                    <div style={{
                        width: "50px",
                        margin: "0 auto",
                    }}>
                        <UserLOGO height={50}/>
                    </div>
                    <div className={styles.pContainer}>
                        <p><span>{username}</span></p>
                        <div className={styles.spanContainer}>
                            <p><span>Dec 24, 2021</span></p>
                            <p><span>4 min read</span></p>
                        </div>
                    </div>
                </div>
                {/* 右边的 */}
                <div className={styles.rightContainer}>
                    <AddLists />
                    <AddLists />
                    <AddLists />
                    <AddLists />
                </div>
            </div>
            {/* 第二个框就是标题，然后是内容 */}
            <h1 className={styles.title} >{title}</h1>
            <Markdown content={content}
                readOnly={true}
            />
        </>
    )
}


export async function getStaticPaths() {
    const data = await fetch("http://localhost:7001/api/blob/id");
    const json = await data.json();
    return {
        paths: json._id.map(value => { return { params: { id: value } } }),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const { username, title, content } = await getPostData(params.id);
    return {
        props: {
            username,
            title,
            content
        }
    }
}

async function getPostData(id) {
    const data = await fetch(`http://localhost:7001/api/blob/search?_id=${id}`);
    const json = await data.json();
    return {
        ...json
    }
}