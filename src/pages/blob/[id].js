import { Markdown } from '@components/edit';
import styles from './index.module.css';
import { UserLOGO, SFLOGO, JUEJINLOGO, GITHUBLOGO } from "@components/nav";

import Head from 'next/head';
import api from "@utils/api";
import { useDispatch } from 'react-redux';
import { viewBlob } from '@features/blob';
import { FavorBlob, idContext } from '@components/article';
import { FetchUserInfo } from '@utils/fetchData';


export default function Post({ title, logoUrl, username, last_edit_time, _id, content, githubUrl, signature, sfUrl, juejinUrl }) {
    const dispatch = useDispatch();
    dispatch(viewBlob({
        author: username,
        githubUrl,
        juejinUrl,
        sfUrl,
        signature,
        logoUrl
    }));
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            {/* 第一个框是作者的信息，包括作者的name，文章日期，阅读时长，作者其他平台链接，添加到收藏 */}
            <div className={styles.nameContainer}>
                {/* 左边的玩意 */}
                <div className={styles.leftContainer}>
                    <div className={styles.leftContainerWrapper}>
                        <UserLOGO height={50} src={logoUrl} href={`/@${username}`} />
                    </div>
                    <div className={styles.pContainer}>
                        <p><span>{username}</span></p>
                        <div className={styles.spanContainer}>
                            <p><span>{last_edit_time}</span></p>
                            <p><span>4 min read</span></p>
                        </div>
                    </div>
                </div>
                {/* 右边的 */}
                <div className={styles.rightContainer}>
                    <JUEJINLOGO url={juejinUrl} />
                    <SFLOGO url={sfUrl} />
                    <GITHUBLOGO url={githubUrl} />
                    <idContext.Provider value={_id}>
                        <FavorBlob />
                    </idContext.Provider>
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
    const data = await fetch(api.articleIds);
    const json = await data.json();
    return {
        paths: json._id.map(value => { return { params: { id: value['_id'] } } }),
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    const { username, title, content, last_edit_time } = await getPostData(params.id);
    const res = await FetchUserInfo(username);
    return {
        props: {
            ...res.data,
            username,
            title,
            content,
            last_edit_time,
            _id: params.id
        }
    }
}

async function getPostData(id) {
    const data = await fetch(`${api.articleSearch}?_id=${id}`);
    const json = await data.json();
    return json;
}