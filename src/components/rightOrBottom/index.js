import { useViewport } from "@components/provider";
import LOGO, { Home, Stories, Lists, UserLOGO } from "@components/nav";
import styles from "./index.module.css";
import { useRouter } from 'next/router';
const orderWidth = 1080;


/**
 * @description 一共需要三种模式，大屏模式，小屏模式和书写模式
 * 书写模式 null
 * 大屏模式从上到下分别是 HotStories，RecommendedTopics，WhoToFollow
 * 小屏模式从左到右分别是 home，Stroies，Lists，${userLOGO}
 */

export default function Aside(){
    const {width}=useViewport();
    const router=useRouter();
    if(router.pathname==='/new-story')
    return (
        <h1>hello</h1>
    )
    return width>orderWidth?<Right />:<Bottom />
}

function Right(){

}

function Bottom(){
    return (
        <div className={styles.bottom}>
            <Home />
            <Stories />
            <Lists />
            <UserLOGO height={24} />
        </div>
    )
}