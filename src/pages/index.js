import Article from "@components/article";
import api from "@utils/api";
export default function Home({ sectionList }) {
    return (
        <>
            <div style={{
                height:"200px",
                backgroundColor:"black",
            }}>
            </div>
            {sectionList.map(section=><Article
             {...section}
             />)}
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetch(api.articles);
    const json = await data.json();
    const res=json.data.map(article=>{return {
        ...article,
        key:article._id,
        content:article.description,
        time:article.last_edit_time,
    }});
    return {
        props: {
            sectionList: res
        }
    }
}

