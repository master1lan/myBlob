import Markdown from "@utils/markdown/markdown";

export default function Post({ username, title, content }) {
    return (
        <>
            <div>{title}</div>
            <div>{username}</div>
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