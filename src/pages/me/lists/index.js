import styles from './lists.module.css';
import { useFetchLists, createList, removeList } from '@utils/fetchData';
import { autoTextarea, middlewareWithLogin } from '@utils/tools';
import { selectUserLists, removeFavorList, addFavorList } from '@features/user';
import Popover from '@utils/popover';
import DEFAULT from "@components/default";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Modal from '@utils/modal';
import { useSSREffect } from '@utils/hooks';

export default function Index() {
    return (
        <div>
            {/* 这里是上面 */}
            <Top />
            {/* 这里是内容区 */}
            <div>
                <ListsContent />
            </div>
        </div>
    )
}

function Top() {
    useFetchLists();
    return (
        <div >
            <div className={styles.topWrapper}>
                <div className={styles.h1Wrapper}>
                    <h1>Your lists</h1>
                </div>
                <div className={styles.topRightWrapper}>
                    <ActionButton />
                </div>
            </div>
        </div>
    )
}

function ActionButton() {
    const [activeTab, setActiveTab] = useState(false);
    const [isNoScroll, setScroll] = useState(false);
    const clickFunc = () => { setScroll(!isNoScroll); setActiveTab(!activeTab) };
    return (
        <>
            <div className={styles.actionButton} onClick={clickFunc}>
                New list
            </div>
            <Modal
                visible={activeTab}
                closeModal={clickFunc}
                isNoScroll={isNoScroll}
            >
                <AddList clickFunc={clickFunc} />
            </Modal>
        </>
    )
}

export function AddList({ clickFunc }) {
    const [listname, setlistname] = useState('');
    const [description, setdescription] = useState('');
    const textareaRef = useRef('');
    const dispatch = useDispatch();
    useSSREffect(() => {
        autoTextarea(textareaRef.current);
    }, []);
    const listnameChange = (e) => {
        if (e.target.value.length <= 20) {
            setlistname(e.target.value);
        }
    };
    const descriptionChange = (e) => {
        if (e.target.value.length <= 280) {
            setdescription(e.target.value);
        }
    };
    const createFunc = async () => {
        const res = await createList(listname, description);
        if (res !== null) {
            dispatch(addFavorList(res));
            clickFunc();
        }
    };
    return (
        <div className={styles.addList}>
            <div><h3><span>创建新收藏夹</span></h3></div>
            <div className={styles.textWrapper}>
                <input placeholder="收藏夹名" value={listname} onChange={listnameChange} />
                <span>{listname.length}/20</span>
            </div>
            <div className={styles.textWrapper}>
                <textarea placeholder="描述"
                    ref={textareaRef}
                    value={description}
                    onChange={descriptionChange}
                />
                <span>{description.length}/280</span>
            </div>
            <div>
                <button className={styles.addListButton} onClick={clickFunc}>取消创建</button>
                <button className={styles.addListButton} onClick={createFunc}>创建</button>
            </div>
        </div>
    )
}

//收藏夹们组件
export function ListsContent() {
    const favorLists = useSelector(selectUserLists);
    return (
        <div className={styles.listsContent}>
            {favorLists.map(item =>
                <List
                    key={item._id}
                    title={item.title}
                    last_edit_time={item.last_edit_time}
                    many={item.content.length}
                    _id={item._id}
                />
            )}
            {!favorLists?.length &&
                <DEFAULT>
                    <p className={styles.default_p}>
                        没有收藏夹哦，点击右上角的<span className={styles.default_spen}>New list</span>按钮创建收藏夹吧！
                    </p>
                </DEFAULT>}
        </div>
    )
}

//单收藏夹组件
function List({ title = 'title', last_edit_time, many = 0, _id }) {
    const [showPop, setShowPop] = useState(false);
    const dispatch = useDispatch();
    const changeshowPop = (e) => {
        e.stopPropagation();
        setShowPop(!showPop);
    }
    const deleteFunc = async () => {
        const res = await removeList(_id);
        if (res) {
            dispatch(removeFavorList({ _id }));
        }
    }
    useSSREffect(() => {
        if (showPop) {
            setTimeout(() => setShowPop(false), 2500);
        };
    }, [showPop]);
    return (
        <Link href={`/me/lists/${_id}`}>
            <div className={styles.listWrapper}>
                <h3>{title}</h3>
                <div className={styles.listFlex}>
                    <p>{many}篇文章</p>
                    <p>{last_edit_time}最后修改</p>
                    <div className={styles.last_For_Delete}>
                        <Popover
                            content={<PopInfo clickFunc={deleteFunc} />}
                        >
                            <svg width="25" height="25">
                                <line y2="20" x2="20" y1="5" x1="5" stroke="#000" fill="none" strokeWidth="2" />
                                <line stroke="#000" y2="20" x2="5" y1="5" x1="20" fill="none" strokeWidth="2" />
                            </svg>
                        </Popover>
                    </div>
                </div>
            </div>
        </Link>
    )
}

//popinfo组件
function PopInfo({ clickFunc }) {
    return (
        <div
            className={styles.sure_Popinfo}
        >

            <p>确认删除？</p>
            <button onClick={clickFunc}>确认</button>
        </div>
    )
}

//如果不进行ssg渲染则nextjs将会认为这是一个静态页面，只将渲染一次！
export const getServerSideProps = middlewareWithLogin;