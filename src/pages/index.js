import Article from "@components/article";
import api from "@utils/api";
import { FetchRecommendBlobs } from "@utils/fetchData";
import { useScrollFetchBlobs } from "@utils/hooks";

export default function Home({ sectionList }) {
    const {ScrollRef,data}=useScrollFetchBlobs({list:sectionList,offset:sectionList.length});
    return (
        <>
            <div style={{
                height: "200px",
                backgroundColor: "black",
            }}>
            </div>
            <div ref={ScrollRef}>
                {data.list.map(section => <Article
                    {...section}
                />)}
                
            </div>
        </>
    )
}





export async function getServerSideProps() {
   const {res}=await FetchRecommendBlobs(0);
    return {
        props: {
            sectionList: res
        }
    }
}

