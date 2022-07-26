import api from "@utils/api";
import { FetchUserBlobsById, FetchUserInfo } from "@utils/fetchData";
import { useDispatch } from 'react-redux';
import { viewBlob } from '@features/blob';
import styles from './me/stories/stories.module.css';
import Article from "@components/article";
export default function Index({ userInfo, blobs }) {
    const { username, githubUrl, juejinUrl,
        sfUrl, signature, logoUrl } = userInfo,
        dispatch = useDispatch();
    dispatch(viewBlob({
        author: username,
        githubUrl,
        juejinUrl,
        sfUrl,
        signature,
        logoUrl
    }));
    return (
        <div>
            <Top username={username} />
            {blobs.map(blob=><Article key={blob._id} {...blob} />)}
        </div>
    )
}


function Top({username}) {
    return (
        <div className={styles.top}>
            <div>
                <div className={styles.topWrapper}>
                    <div className={styles.h1Wrapper}>
                        <h1>{username}</h1>
                    </div>
                </div>
                <div className={styles.topFlexCenter}>
                    <div className={styles.topBottom} >
                        home
                    </div>
                </div>
            </div>
        </div>
    )
}





//获取所有用户名字
export async function getStaticPaths() {
    const data = await fetch(api.userAllName);
    const json = await data.json();
    return {
        paths: json.data.map(value => { return { params: { id: `@${value.username}` } } }),
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const id = params.id.slice(1),
        blobs = await FetchUserBlobsById(id),
        { data } = await FetchUserInfo(id);
        
    return {
        props: {
            userInfo: data,
            blobs:blobs.map(blob=>{return{
                ...blob,
                key:blob._id,
                content:blob.description,
                time:blob.last_edit_time,
                logoUrl:data.logoUrl
            }})
        }
    }
}


//此页面是用于展示从别人角度看个人页面的