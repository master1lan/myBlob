import { remark } from "remark";
import html from "remark-html";


export default function Post({ title, username, content }) {
    return (
        <>
            <div>{title}</div>
            <div>{username}</div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </>
    )
}

export async function getStaticProps({ id }) {
    console.log(12)
    const { username, title, content } = await getPostData(id);
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();
    return{
        username,
        title,
        contentHtml
    }
}

async function getPostData(id) {
    const data = await fetch(`http://localhost:7001/api/blob/search?_id=${id}`);
    console.log({data});
    const json = await data.json();
    return {
        ...json
    }
}