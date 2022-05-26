import MarkDownSection from "@utils/markdown/markdown"

export default function Home({ sectionList }) {

    return (
        <ul>
            {sectionList.map(section=>(<li key={section._id}>
                <p>{section.title}</p>
                <p>{section.username}</p>
                <MarkDownSection 
                content={section.content}
                readOnly={true}
                />
            </li>))}
        </ul>
    )
}

export async function getServerSideProps() {
    const data = await fetch(`http:localhost:7001/api/blob`);
    const json = await data.json();
    return {
        props: {
            sectionList: json
        }
    }
}