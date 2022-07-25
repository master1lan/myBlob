import { useViewport } from "@components/provider";
import { Home, Stories, Lists, UserLOGO, Follow } from "@components/nav";
import styles from "./rightOrBottom.module.css";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectUserInfo } from "@features/user";
import { selectBlobInfo } from "@features/blob";
import { useRecommendMoreBlobs, useRecommendMoreUsers } from "@utils/fetchData";
import Link from "next/link";

/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式 null
 * 大屏模式从上到下分别是 HotStories，RecommendedTopics，WhoToFollow
 * 小屏模式从左到右分别是 home，Stroies，Lists，${userLOGO}
 */
export default function Aside() {
    const { typePC } = useViewport();
    return typePC ? <Right /> : <Bottom />
}

const __DecidePathName=['/blob/[id]','/[id]'];

function Right() {
    const router = useRouter();
    const flag = __DecidePathName.includes(router.pathname);
    return (
        <div className={styles.right}>
            <div className={styles.rightLogo}></div>
            <div className={styles.rightWrapper}>
                <div className={styles.rightTop}>
                    {flag ? <UserInfo /> : <ReadIng />}
                </div>
                <div className={styles.rightBottom}>
                    {flag ? <Recommend /> : <UserRecommend />}
                </div>
            </div>
        </div>
    )
}

function UserInfo() {
    const { author, signature, logoUrl } = useSelector(selectBlobInfo);
    return (
        <div className={styles.userInfo} >
            <UserLOGO height="88" src={logoUrl} />
            <h2>{author}</h2>
            <p><span>{signature || '该用户未设置个性签名'}</span></p>
            <div>
                <Follow />
            </div>
        </div>
    )
}

function Recommend() {
    const blobArr = useRecommendMoreBlobs(3);
    return (
        <div>
            <h2>More from medium</h2>
            {blobArr.map(blob=><Section key={blob._id} {...blob} />)}
        </div>
    )
}

function ReadIng() {
    const blobArr = useRecommendMoreBlobs(3);
    return (
        <div>
            <p>
                <span className={styles.dot}></span>
                <span>What We're Reading Today</span>
            </p>
            {blobArr.map(blob=><Section key={blob._id} {...blob} />)}
        </div>
    )
}


function Section({ username, logoUrl, _id, title }) {
    return (
        <div>
            <div className={styles.section} >
                <UserLOGO src={logoUrl} />
                <p><span>{username}</span></p>
            </div>
            <h3 style={{
                marginLeft: '3px',
            }}>
                <Link href={`/blob/${_id}`}>
                    <p><span>{title}</span></p>
                </Link>
            </h3>

        </div>
    )
}


function UserRecommend() {
    const usersArr=useRecommendMoreUsers(3);
    return (
        <div className={styles.userRecommend}>
            <p>Who to follow</p>
            {usersArr.map(user=><UserRecommendItem key={user.uuid} {...user} />)}
        </div>
    )
}

function UserRecommendItem({logoUrl,username,signature}) {
    return (
        <div className={styles.userRecommendItem}>
            <div className={styles.userRecommendItemContainer}>
                <div>
                    <UserLOGO height="50" src={logoUrl} />
                </div>
                <div>
                    <p>{username}</p>
                    <p>{signature|| '该用户未设置个性签名'}</p>
                </div>
            </div>
            <Follow />
        </div>
    )
}

/**
 * 底边栏
 */
function Bottom() {
    const { logoUrl } = useSelector(selectUserInfo);
    return (
        <div className={styles.bottom}>
            <Home />
            <Stories />
            <Lists />
            <UserLOGO height={24} src={logoUrl} />
        </div>
    )
}