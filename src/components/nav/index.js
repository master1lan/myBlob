import Link from "next/Link";
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from "./index.module.css";

function Nav({ href = '/', children }) {
    return (
        <div style={{
            margin: "0 auto"
        }}>
            <Link href={href}>
                <a>
                    {children}
                </a>
            </Link>
        </div>
    )
}
//网页LOGO
export default function LOGO() {
    return (
        <div className={styles.logo}>
            <Nav href='/'>
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 1043.63 592.71" ><g ><g ><path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path></g></g></svg>
            </Nav>
        </div>
    )
}
//home图标
export function Home({ href = '/' }) {
    const router = useRouter();
    if (router.pathname !== href)
        return (
            <Nav href={href} >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home">
                    <path d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                    </path>
                </svg>
            </Nav>
        )
    return (
        <Nav href={href}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home">
                <path d="M4.5 21.25V10.87c0-.07.04-.15.1-.2l7.25-5.43a.25.25 0 0 1 .3 0l7.25 5.44c.06.04.1.12.1.2v10.37c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25z" fill="currentColor" stroke="currentColor" strokeLinejoin="round"></path>
                <path d="M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </Nav>
    )
}
//stories图标，个人文章页
export function Stories({ href = '/me/stories/drafts' }) {
    const router = useRouter();
    if (router.pathname !== href)
        return (
            <Nav href={href}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z" stroke="currentColor"></path><path d="M8 8.5h8M8 15.5h5M8 12h8" stroke="currentColor" strokeLinecap="round"></path></svg>
            </Nav>
        )
    return (
        <Nav href={href}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 2.75c0-.41.34-.75.75-.75h14.5c.41 0 .75.34.75.75v18.5c0 .41-.34.75-.75.75H4.75a.75.75 0 0 1-.75-.75V2.75zM7 8.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 7c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM7 12c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 7 12z" fill="currentColor"></path></svg>
        </Nav>
    )
}
//list图标，保存文章页
export function Lists({ href = '/me/lists' }) {
    const router = useRouter();
    if (router.pathname !== href)
        return (
            <Nav href={href}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Lists"><path d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z" stroke="currentColor" strokeLinecap="round"></path><path d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5" stroke="currentColor" strokeLinecap="round"></path></svg>
            </Nav>
        )
    return (
        <Nav href={href}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Lists"><path d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z" fill="currentColor" stroke="currentColor" stroke-linecap="round"></path><path d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5" stroke="currentColor" stroke-linecap="round"></path></svg>
        </Nav>
    )
}
//write图标，书写页
export function Write() {
    return (
        <Nav href='/new-story'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
        </Nav>
    )
}

//用户logo标签
export function UserLOGO({ height = '30' }) {
    return (
        <div style={{
            width: height,
            height: height,
            margin: "0 auto",
        }}>
            <Nav href="/me">
                <Image style={{ borderRadius: "50%" }} src="/images/UserLOGO.png" width={48} height={48} />
            </Nav>
        </div>
    )
}
//publish标签
export function Publish({ onclick }) {
    return (
        <div >
            <button onClick={onclick} className={styles.button}>
                <span className={styles.publish}>
                    Publish
                </span>
            </button>
        </div>
    )
}

//addLists
export function AddLists({width='26',height='26'}) {
    return (
        <div style={{
            width:width,
            height:height
        }}>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" >
                <path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path>
            </svg>
        </div>
    )
}