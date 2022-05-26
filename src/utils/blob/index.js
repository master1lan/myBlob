import ReactMarkdown from 'react-markdown';

export default function Post({ title, username, content }) {
    return (
        <>
            <div>{title}</div>
            <div>{username}</div>
            <ReactMarkdown children={content} className="markdown-html"/>
        </>
    )
}

