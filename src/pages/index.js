import Article from "@components/article";
import { FetchRecommendBlobs } from "@utils/fetchData";
import { __useScrollFetchBlobs_version_1 } from "@utils/hooks";


export default function Home({ sectionList }) {
    const { ScrollRef, data } = __useScrollFetchBlobs_version_1({ list: sectionList, offset: sectionList.length });
    return (
        <>
            <div style={{
                height: "200px",
                backgroundColor: "black",
            }}>

            </div>
            <div ref={ScrollRef}>
                {data.map(section => <Article
                    {...section}
                />)}
            </div>
        </>
    )
}





export async function getServerSideProps() {
    const { res } = await FetchRecommendBlobs(0);
    return {
        props: {
            sectionList: res
        }
    }
}

