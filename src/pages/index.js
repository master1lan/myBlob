import MarkDownSection from "@utils/markdown/markdown";
import Article from "@utils/article";
import api from "@utils/api";
export default function Home({ sectionList }) {    
    return (
        <>{<ul>
            {sectionList.map(section=>(<li key={section._id}>
                <p>{section.title}</p>
                <p>{section.username}</p>
                <MarkDownSection 
                content={section.content}
                readOnly={true}
                />
                {/* <Article /> */}
            </li>))}
        </ul>}</>
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

