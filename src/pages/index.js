import MarkDownSection from "@utils/markdown/markdown";
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
             key={section._id} 
             content={section.content}
             title={section.title}
             username={section.username}
             _id={section._id}
             />)}
        </>
    )
}

export async function getServerSideProps() {
    const data = await fetch(api.articles);
    const json = await data.json();
    return {
        props: {
            sectionList: json
        }
    }
}

