import { UserLOGO, Favor } from "@components/nav";
import Link from "next/link";
import styles from "./article.module.css";
import { selectUserLists } from "@features/user";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useContext, createContext,useEffect } from "react";
import { useOnClickOutside } from "@utils/hooks";
import { favorBlob,unfavorBlob } from "@utils/fetchData";
import { isBlobIncludes } from "@utils/tools";
import { AddList } from "src/pages/me/lists";
import Modal from "@utils/modal";

//blob_id的context
export const idContext = createContext();

export default function Index({ title, username, content, _id, time }) {
    return (
        <div className={styles.article}>
            <div className={styles.container}>
                <div className={styles.user}>
                    <div>
                        <UserLOGO />
                    </div>
                    <div>
                        {username}
                    </div>
                    <div>
                        {time}
                    </div>
                </div>
                <Link href={`/blob/${_id}`} >
                <a>
                    <div><h2 className={styles.h2}>{title}</h2></div>
                    <div><p className={styles.content}>{content}</p></div>
                </a>
                </Link>
                <div className={styles.underlineWrapper}>
                    <div style={{
                        borderRadius: "100px",
                        backgroundColor: "rgb(242,242,242)",
                        padding: "4px 8px"
                    }}>
                        JavaScript
                    </div>
                    <div>
                        3 min read
                    </div>
                    <div>
                        {/* 这里只有最后的组件才需要使用blob_id */}
                        <idContext.Provider value={ _id }>
                            <FavorBlob />
                        </idContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    )
}
//收藏组件
export function FavorBlob() {
    const blob_id=useContext(idContext),
    favorList=useSelector(selectUserLists),
    isFavored=isBlobIncludes(favorList,undefined,blob_id);
    const [isvisible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));

    return (
        <div style={{
            cursor: "pointer",
            position: "relative",
            fontSize: "16px",
        }} onClick={(event) => {
            event.nativeEvent?.stopImmediatePropagation();
            setVisible(true);
        }}>
            <Favor isfavored={isFavored} />
            {isvisible && <AddFavor  />}
        </div>
    )
}


const AddFavorStyle={
    "up":{
        "top":"-75px"
    },
    "place":{
        "top":"0px"
    },
    "down":{
        "top":"68px"
    }
}

//收藏夹
function AddFavor() {
    const domRef=useRef(null);
    const [placeStyle,setStyle]=useState("place");
    const lists = useSelector(selectUserLists);
    useEffect(()=>{
        const clientHeight=window.innerHeight;
        function checkLanch(){
            const domtop=domRef.current.getBoundingClientRect().top,
            domHeight=domRef.current.getBoundingClientRect().bottom-domtop;
            if(domtop<50){
                //小于50，说明需要放入下面
                placeStyle!=="down"&&setStyle("down");
            }else if(domtop+domHeight+10>clientHeight){
                //需要放在上面
                placeStyle!=="up"&&setStyle("up");
            }else{
                //就平放就行
                placeStyle!=="place"&&setStyle("place");
            }
        };
        window.addEventListener('scroll',checkLanch);
        return ()=>window.removeEventListener('scroll',checkLanch);
    },[]);
    return (
        <div className={styles.addFavorWrapper} ref={domRef} style={AddFavorStyle[placeStyle]} >
            <p>添加至收藏夹</p>
            <div className={styles.addFavor}>
                {lists.map(item => <div
                    className={styles.addFavorItem}
                    key={item._id}>
                    <ClickFavor title={item.title} list_id={item._id} />
                </div>)}
            </div>
            <CreateList />
        </div>
    )
}


function CreateList(){
    const [isvisible,setVisible]=useState(false);
    const clickFunc = () =>setVisible(!isvisible);
    const modalConfig={
        visible:isvisible,
        closeModal:clickFunc
    }
    return(
        <>
        <div onClick={clickFunc} >Create new list</div>
        <Modal {...modalConfig}><AddList clickFunc={clickFunc} /></Modal>
        </>
    )
}


//注意这里还没做点击后更新状态
const FavorFunc=(isFavored,list_id,blob_id,setFavor)=>async()=>{
    if(isFavored){
        await unfavorBlob(blob_id,list_id);
    }else{  
        await favorBlob(blob_id,list_id);
    }
    setFavor(!isFavored);
}

//单个收藏夹
function ClickFavor({ title, list_id }) {
    const blob_id=useContext(idContext),
    favorList=useSelector(selectUserLists),
    isFavored=isBlobIncludes(favorList,list_id,blob_id);
    const [clicked, setActive] = useState(isFavored);

    return (
        <>
            <input type="checkbox" style={{
                width: "20px"
            }} checked={clicked} onChange={FavorFunc(clicked,list_id,blob_id,setActive)} />
            <p className={styles.ClickFavorP}>{title}</p>
        </>
    )
}

