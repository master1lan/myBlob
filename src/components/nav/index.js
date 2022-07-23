import Link from "next/link";
import { useRouter } from 'next/router';
import Image from "next/image";
import styles from "./nav.module.css";
import { URL } from "@utils/api";
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

//再次封装image
const MYOWNLOADER = ({ src }) => `${URL}/${src}`;

export const Imagewrapper = (props) => {
    return (
        <Image
            loader={MYOWNLOADER}
            {...props}
        />
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
export function Stories({ href = '/me/stories' }) {
    const router = useRouter();
    if (router.pathname !== href)
        return (
            <Nav href={href}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z" stroke="currentColor"></path><path d="M8 8.5h8M8 15.5h5M8 12h8" stroke="currentColor" strokeLinecap="round"></path></svg>
            </Nav>
        )
    return (
        <Nav href={href}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path fillRule="evenodd" clipRule="evenodd" d="M4 2.75c0-.41.34-.75.75-.75h14.5c.41 0 .75.34.75.75v18.5c0 .41-.34.75-.75.75H4.75a.75.75 0 0 1-.75-.75V2.75zM7 8.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 7c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM7 12c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 7 12z" fill="currentColor"></path></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Lists"><path d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z" fill="currentColor" stroke="currentColor" strokeLinecap="round"></path><path d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5" stroke="currentColor" strokeLinecap="round"></path></svg>
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
export function UserLOGO({ height = '30', src = `${URL}/public/userlogo/userLOGO.png`, href = '/me' }) {
    return (
        <div style={{
            width: height,
            height: height,
            margin: "0 auto",
        }}>
            <Nav href={href}>
                <img style={{ borderRadius: "50%" }} src={src} width={height} height={height}/>
            </Nav>
        </div>
    )
}
//publish标签
export function Publish({ onClick }) {
    return (
        <div >
            <button onClick={onClick} className={styles.button}>
                <span className={styles.publish}>
                    Publish
                </span>
            </button>
        </div>
    )
}

//addLists
export function AddLists({ width = '26', height = '26' }) {
    return (
        <div style={{
            width: width,
            height: height
        }}>
            <svg width={width} height={height} viewBox="0 0 24 24" fill="none" >
                <path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path>
            </svg>
        </div>
    )
}

//
export function ActionButton({ message = '', href = '/' }) {
    return (
        <Link href={href}>
            <a
                className={styles.actionButtonA}
            >
                {message}
            </a>
        </Link>
    )
}

//关注按钮
export function Follow() {
    return (
        <div>
            <button className={styles.followButton}>Follow</button>
        </div>
    )
}

//收藏图标
export function Favor({ isfavored = false }) {
    if (!isfavored)
        return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z" fill="#000"></path></svg>
        );
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M7.5 3.75a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-14a2 2 0 0 0-2-2h-9z" fill="#000"></path></svg>
    );
}

export function SFLOGO({ url }) {
    const colorStyle = ["#292929", "#ddd"];
    return (
        <div>
            <a href={url || '#'}>
                <svg viewBox="0 0 1024 1024" width="24" height="24">
                    <path d="M122.784 771.887c37.744 34.186 91.994 64.87 143.897 64.87 37.744 0 80.196-16.515 80.196-61.339 0-49.53-57.795-57.786-122.662-86.101-73.125-31.852-134.463-70.762-134.463-163.95 0-121.483 97.899-173.373 219.38-173.373 66.050 0 136.825 15.341 187.532 48.357v14.147l-47.177 93.188c-33.020-24.765-77.846-41.274-127.387-41.274-43.636 0-70.762 17.68-70.762 51.888 0 44.806 51.902 54.253 116.77 79.019 89.633 34.211 143.885 71.953 143.885 167.479 0 125.014-97.888 179.287-227.625 179.287-82.57 0-148.62-22.422-211.126-69.591v-14.146l49.541-88.463z" fill={colorStyle[+!url]} />
                    <path d="M655.82 942.875c0-11.963 2.371-337.511 3.559-450.013-32.272 1.188-65.826 1.188-75.365 1.188l1.188-120.88c9.586 0 41.906 0 72.991 1.188 0-4.794-2.371-104.127-2.371-107.711 0-135.234 78.973-185.519 181.91-185.519 44.281 0 89.744 7.19 135.261 26.34v17.939l-34.74 95.749c-19.129-10.774-40.674-16.753-59.847-16.753-33.505 0-55.053 16.753-55.053 80.182 0 21.545 1.233 84.976 1.233 89.771 35.881-1.188 104.127-1.188 113.667-1.188l-1.188 120.88c-9.588 0-77.787 0-113.713-1.188 2.419 112.501 2.419 438.050 2.419 450.013h-169.952z" fill={colorStyle[+!url]} />
                </svg>
            </a>
        </div>
    )
}

export function JUEJINLOGO({ url }) {
    const colorStyle = ["#292929", "#ddd"];
    return (
        <div>
            <a href={url || '#'}>
                <svg viewBox="0 0 764.000000 764.000000" width="24" height="24">
                    <g transform="translate(0.000000,764.000000) scale(0.100000,-0.100000)" stroke="none" fill={colorStyle[+!url]}>
                        <path d="M3710 6773 c-58 -46 -120 -96 -139 -111 -147 -117 -307 -247 -317 -256 -6 -6 -68 -55 -137 -110 -69 -54 -143 -113 -164 -132 -21 -19 -42 -34 -47 -34 -4 0 2 -11 15 -25 13 -13 29 -25 36 -25 6 0 13 -4 15 -9 2 -5 120 -102 263 -216 143 -114 278 -221 299 -238 56 -45 119 -96 131 -105 45 -33 113 -90 128 -104 21 -21 24 -22 41 -5 8 6 24 19 36 27 13 8 30 22 39 31 9 8 45 38 81 64 80 61 87 66 108 86 9 8 57 47 107 85 49 38 98 77 110 87 11 10 106 86 210 169 105 82 194 154 200 159 10 10 -22 43 -95 98 -19 14 -41 32 -48 39 -8 7 -30 25 -50 40 -21 15 -39 29 -42 33 -3 3 -122 99 -265 213 -143 113 -269 215 -280 224 -29 26 -108 88 -120 94 -5 3 -57 -32 -115 -79z"></path>
                        <path d="M1984 5387 c-55 -45 -117 -95 -138 -112 -22 -16 -44 -34 -50 -40 -6 -5 -34 -28 -61 -50 -28 -22 -55 -44 -62 -50 -7 -5 -18 -14 -25 -20 -50 -39 -116 -91 -130 -104 -34 -31 -46 -40 -51 -35 -2 3 -7 -2 -10 -10 -4 -9 6 -25 26 -41 18 -14 38 -30 46 -37 7 -6 34 -27 60 -46 25 -19 48 -39 49 -44 2 -4 10 -8 17 -8 7 0 15 -4 17 -8 2 -4 37 -34 78 -67 41 -32 77 -62 80 -65 3 -3 21 -17 40 -30 19 -13 37 -27 40 -30 5 -7 227 -182 290 -230 18 -14 38 -30 44 -35 6 -6 31 -26 56 -45 25 -19 47 -38 48 -42 2 -5 8 -8 14 -8 6 0 16 -6 22 -13 6 -8 52 -45 101 -83 50 -38 92 -71 95 -74 3 -3 37 -30 75 -60 39 -30 75 -59 82 -65 15 -12 27 -21 83 -65 25 -19 50 -39 56 -45 6 -5 46 -37 89 -70 120 -93 337 -265 365 -289 14 -12 41 -32 60 -46 19 -14 44 -32 55 -42 19 -15 98 -79 120 -96 75 -58 101 -78 105 -82 21 -22 140 -110 149 -110 8 0 376 284 476 368 11 9 40 32 65 51 25 19 50 39 57 45 7 6 25 21 40 33 133 103 279 218 283 223 3 3 23 19 45 35 22 16 47 35 55 42 8 7 67 53 130 103 63 50 129 101 145 115 17 13 134 105 260 205 127 100 242 191 257 203 15 12 39 31 54 42 15 11 44 34 65 51 21 17 97 78 171 135 73 57 135 106 138 109 3 3 33 28 68 55 l63 48 -31 29 c-17 15 -35 28 -40 28 -4 0 -10 4 -12 8 -1 4 -37 35 -78 67 -41 33 -77 62 -80 65 -3 3 -84 68 -180 144 -96 77 -177 142 -180 145 -32 36 -38 35 -127 -35 -49 -37 -90 -71 -93 -74 -3 -3 -45 -37 -95 -75 -97 -75 -287 -226 -320 -253 -11 -10 -36 -28 -55 -42 -19 -13 -42 -32 -51 -42 -9 -10 -19 -18 -23 -18 -3 0 -16 -9 -28 -19 -34 -29 -198 -159 -538 -426 -168 -132 -307 -242 -310 -245 -3 -3 -33 -28 -68 -54 l-63 -48 -57 43 c-31 24 -61 48 -67 53 -5 6 -28 24 -50 40 -22 17 -42 32 -45 36 -3 3 -21 17 -42 32 -20 15 -42 33 -50 40 -7 7 -40 33 -73 57 -33 25 -62 47 -65 51 -3 3 -25 21 -50 40 -25 19 -52 41 -60 47 -8 7 -82 66 -165 131 -82 64 -159 125 -170 134 -11 9 -58 46 -105 83 -106 82 -139 108 -167 132 -12 10 -36 29 -54 43 -44 34 -152 118 -164 128 -5 4 -64 50 -130 102 -66 52 -122 97 -125 100 -10 10 -89 70 -92 69 -2 0 -48 -37 -104 -82z"></path>
                        <path d="M6884 4222 c-60 -47 -186 -147 -280 -222 -94 -74 -186 -146 -204 -160 -78 -59 -185 -146 -188 -152 -2 -5 -8 -8 -12 -8 -5 0 -20 -10 -33 -22 -13 -13 -39 -34 -57 -48 -34 -25 -140 -109 -171 -135 -10 -7 -48 -37 -85 -66 -38 -29 -76 -60 -85 -68 -8 -9 -32 -27 -52 -41 -20 -14 -37 -28 -37 -32 0 -5 -6 -8 -14 -8 -8 0 -16 -3 -18 -8 -1 -4 -61 -54 -133 -110 -71 -57 -137 -108 -145 -115 -8 -7 -49 -38 -90 -70 -41 -32 -91 -71 -110 -87 -19 -16 -73 -59 -120 -95 -47 -36 -97 -77 -113 -90 -15 -14 -31 -25 -36 -25 -5 0 -11 -3 -13 -7 -2 -7 -59 -54 -133 -111 -64 -49 -183 -143 -195 -154 -9 -7 -67 -53 -130 -103 -63 -49 -116 -93 -118 -97 -2 -4 -8 -8 -13 -8 -5 0 -20 -9 -32 -21 -18 -17 -95 -78 -282 -224 -16 -13 -61 -48 -99 -78 l-68 -55 -82 65 c-114 92 -138 111 -256 203 -58 45 -107 85 -110 89 -3 3 -43 35 -90 71 -107 81 -98 74 -145 115 -22 19 -43 35 -47 35 -4 0 -13 6 -20 13 -7 7 -49 41 -93 76 -44 34 -93 73 -110 86 -16 14 -100 79 -185 146 -146 116 -303 239 -325 257 -5 4 -48 38 -95 75 -215 169 -557 441 -578 458 -12 10 -27 19 -32 19 -6 0 -10 3 -10 8 0 4 -33 32 -72 62 -40 30 -102 78 -138 108 -36 29 -168 134 -295 233 -126 99 -239 188 -250 197 -11 9 -63 50 -115 91 -52 41 -97 78 -98 83 -5 12 -42 9 -56 -4 -7 -7 -27 -24 -45 -38 -18 -14 -63 -50 -100 -80 -187 -153 -416 -335 -424 -339 -5 -2 -18 -12 -28 -22 -18 -18 -17 -20 41 -64 32 -25 65 -51 72 -58 7 -6 31 -25 53 -41 22 -17 42 -33 45 -36 3 -3 45 -37 95 -75 49 -39 97 -75 105 -82 42 -34 291 -231 316 -250 16 -12 40 -31 54 -42 14 -11 66 -52 115 -91 50 -39 99 -78 109 -87 11 -9 40 -32 65 -51 25 -19 67 -52 92 -73 26 -22 52 -39 58 -39 6 0 11 -4 11 -8 0 -4 21 -24 48 -44 26 -20 57 -45 69 -55 12 -10 34 -27 49 -38 15 -11 32 -24 38 -30 6 -5 29 -23 51 -39 22 -17 42 -33 45 -36 3 -3 46 -37 95 -75 50 -38 92 -72 95 -75 3 -3 23 -19 45 -35 22 -17 42 -32 45 -36 5 -5 178 -142 240 -189 18 -14 40 -32 50 -40 10 -8 32 -26 50 -40 18 -14 81 -63 140 -110 59 -47 119 -94 134 -105 16 -11 33 -25 40 -30 6 -6 65 -53 131 -105 66 -52 125 -99 131 -105 7 -5 24 -19 39 -30 37 -27 187 -146 203 -162 7 -7 16 -13 20 -13 4 0 25 -16 47 -35 22 -19 45 -38 50 -43 18 -13 99 -77 115 -89 73 -58 337 -267 380 -300 30 -23 69 -54 85 -67 17 -14 39 -32 50 -40 11 -8 34 -26 50 -40 32 -26 45 -24 85 13 23 20 35 29 91 72 24 19 89 70 144 114 138 109 394 311 429 338 15 12 33 27 40 32 6 6 40 33 76 60 36 27 70 54 76 60 7 5 26 21 44 35 29 23 74 58 140 110 14 11 57 44 95 75 39 30 85 67 104 82 18 16 41 32 50 37 9 5 18 12 21 16 4 6 140 115 260 208 19 15 68 54 110 87 41 33 116 92 165 130 50 38 92 72 95 75 3 3 57 46 120 95 63 49 123 96 132 104 9 9 23 21 30 26 12 9 118 90 156 120 7 5 21 17 31 25 9 8 35 28 56 45 54 40 62 47 90 73 13 12 28 22 34 22 5 0 11 3 13 8 3 6 102 87 187 152 18 13 43 33 56 45 13 11 42 33 64 49 23 17 41 33 41 38 0 4 6 8 14 8 8 0 16 3 18 8 2 4 77 66 168 137 149 116 205 161 250 198 17 14 103 81 150 117 85 64 215 172 213 177 -1 2 -19 18 -40 34 -21 16 -45 35 -53 42 -8 7 -49 39 -90 72 -41 33 -77 62 -80 65 -3 3 -72 59 -155 124 -82 66 -152 122 -155 126 -3 3 -19 16 -36 27 l-30 22 -110 -87z"></path>
                    </g>
                </svg>
            </a>
        </div>
    )
}

export function GITHUBLOGO({ url }) {
    const colorStyle = ["#292929", "#ddd"];
    return (
        <div>
            <a href={url||'#'}>
                <svg width="24" height="24" viewBox="0 0 32 32">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z"
                        fill={colorStyle[+!url]} />
                </svg>
            </a>
        </div>
    )
}