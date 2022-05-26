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


export async function getStaticPaths() {
    // Return a list of possible value for id
    const data=await fetch("http://localhost:7001/api/blob");
    const json=await data.json();
    // console.log(json._id.map(value=>{return {params:{id:value}}}));
    return{
        // paths:[{params:{id:'3Sgs7opPEsIXvxLS_IIoo'}}],
        paths:json._id.map(value=>{return {params:{id:value}}}),
        fallback:false
    }
  }
  
  export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
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