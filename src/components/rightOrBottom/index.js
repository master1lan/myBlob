import { useViewport } from "@components/provider";
import LOGO, { Home, Stories, Lists, UserLOGO, Follow } from "@components/nav";
import styles from "./index.module.css";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
const orderWidth = 1080;


/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式 null
 * 大屏模式从上到下分别是 HotStories，RecommendedTopics，WhoToFollow
 * 小屏模式从左到右分别是 home，Stroies，Lists，${userLOGO}
 */

export default function Aside() {
    const { width } = useViewport();
    return width > orderWidth ? <Right /> : <Bottom />
}

const scrollUp = (ele, targetHeight, setPosition, setTop) => {
    let isRunning = false, oldScrollTop = 0;
    return function () {
        if (isRunning || !ele) return;
        isRunning = true;
        window.requestAnimationFrame(function () {
            //下降
            if (ele.scrollTop > oldScrollTop) {
                setPosition('sticky');
                setTop(`-${targetHeight}px`);
            } else if (ele.scrollTop > targetHeight) {
                // 上升但是没有上升多少
            }
            // console.log(ele.scrollTop);
            isRunning = false;
            oldScrollTop = ele.scrollTop;
        });
    }
}

function Right() {
    //我估计最难的就是这里了
    const [topHeight, setHeight] = useState(0);
    const [scroll, setScroll] = useState(null);
    const [position, setPosition] = useState('relative');
    const [top, setTop] = useState('0px');
    //获取滑动条位置
    useEffect(() => {
        setScroll(document.documentElement);
    }, []);
    //获取用户信息栏高度
    useEffect(() => {
        setHeight(document.getElementsByClassName(styles.rightTop)[0].offsetHeight);
    }, []);
    // useEffect(()=>{
    //     let rollFunc=null;
    //     new Promise(resolve =>{
    //         rollFunc=scrollUp(scroll,topHeight);
    //         resolve(rollFunc);
    //     }).then((Func)=>{
    //         window.addEventListener('scroll',Func);
    //     });
    //     return ()=>window.removeEventListener('scroll',rollFunc);
    // },[topHeight]);
    const router = useRouter();
    const flag = router.pathname === '/blob/[id]';
    return (
        <div className={styles.right}
            style={{
                position: position,
                top: top
            }}
        >
            <div className={styles.rightTop}>
                {flag ? <UserInfo /> : <ReadIng />}
            </div>
            <div className={styles.rightBottom}>
                {flag ? <Recommend /> : <UserRecommend />}
            </div>
        </div>
    )
}

function UserInfo() {
    return (
        <div className={styles.userInfo} >
            <div style={{
                height: "200px",
                backgroundColor: "black",
            }}></div>
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
            <Section />
            <Section />
        </div>
    )
}

function ReadIng() {
    return (
        <div>
            <div style={{
                height: "100px",
                backgroundColor: "black",
            }}></div>
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