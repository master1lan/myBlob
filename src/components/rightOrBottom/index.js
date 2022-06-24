import { useViewport } from "@components/provider";
import LOGO, { Home, Stories, Lists, UserLOGO, Follow } from "@components/nav";
import styles from "./rightOrBottom.module.css";
import { useRouter } from 'next/router';



/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式 null
 * 大屏模式从上到下分别是 HotStories，RecommendedTopics，WhoToFollow
 * 小屏模式从左到右分别是 home，Stroies，Lists，${userLOGO}
 */
export default function Aside() {
    const { typePC } = useViewport();
    return typePC?<Right />:<Bottom />
}


function Right() {
    const router = useRouter();
    const flag = router.pathname === '/blob/[id]';
    console.log('right rerender');
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
    return (
        <div className={styles.userInfo} >
            <UserLOGO height="88" />
            <h2>saber</h2>
            <p><span>you know,for search</span></p>
            <div>
                <Follow />
            </div>
        </div>
    )
}

function Recommend() {
    return (
        <div>
            <h2>More from medium</h2>
            <Section />
            <Section />
            <Section />
        </div>
    )
}

function ReadIng() {
    return (
        <div>
            <p>
                <span className={styles.dot}></span>
                <span>What We're Reading Today</span>
            </p>
            <Section />
            <Section />
            <Section />
        </div>
    )
}


function Section() {
    return (
        <div>
            <div className={styles.section} >
                <UserLOGO />
                <p><span>username</span></p>
            </div>
            <h3 style={{
                marginLeft: '3px',
            }}>
                <p><span>title</span></p>
            </h3>

        </div>
    )
}


function UserRecommend() {
    return (
        <div className={styles.userRecommend}>
            <p>Who to follow</p>
            <UserRecommendItem />
            <UserRecommendItem />
            <UserRecommendItem />
        </div>
    )
}

function UserRecommendItem() {
    return (
        <div className={styles.userRecommendItem}>
            <div className={styles.userRecommendItemContainer}>
                <div>
                    <UserLOGO height="50" />
                </div>
                <div>
                    <p>username</p>
                    <p>seginfication</p>
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
    return (
        <div className={styles.bottom}>
            <Home />
            <Stories />
            <Lists />
            <UserLOGO height={24} />
        </div>
    )
}