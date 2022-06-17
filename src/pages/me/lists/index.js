import styles from './lists.module.css';
import message from '@utils/message';
import { useFetchLists } from '@utils/fetchData';
import { selectUserLists } from '@features/user';
import { useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
export default function () {
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
        <div className={styles.top}>
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
    const clickFunc = () => setActiveTab(!activeTab);
    return (
        <>
            <div className={styles.actionButton} onClick={clickFunc}>
                New list
            </div>
            {activeTab && <AddList clickFunc={clickFunc} />}
        </>
    )
}

function AddList({clickFunc}) {
    const [listname, setlistname] = useState('');
    const [description, setdescription] = useState('');
    const textareaRef = useRef('');
    useEffect(() => {
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
                    <button className={styles.addListButton}>创建</button>
                </div>
        </div>
    )
}
/**

* 文本框根据输入内容自适应高度

* @param                {HTMLElement}        输入框元素

* @param                {Number}                设置光标与输入框保持的距离(默认0)

* @param                {Number}                设置最大高度(可选)

*/

function autoTextarea(elem, extra, maxHeight) {
    extra = extra || 0;
    let isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
        addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
        },
        getStyle = elem.currentStyle ? function (name) {
            let val = elem.currentStyle[name];
            if (name === 'height' && val.search(/px/i) !== 1) {
                let rect = elem.getBoundingClientRect();
                return rect.bottom - rect.top -
                    parseFloat(getStyle('paddingTop')) -
                    parseFloat(getStyle('paddingBottom')) + 'px';
            };
            return val;
        } : function (name) {
            return getComputedStyle(elem, null)[name];
        },
        minHeight = parseFloat(getStyle('height'));
    const change = function () {
        let scrollTop, height,
            padding = 0,
            style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};



export function ListsContent() {
    const favorLists = useSelector(selectUserLists);
    return (
        <div className={styles.listsContent}>
            {favorLists.map(item =>
                <List key={item._id}
                    title={item.title}
                    last_edit_time={item.last_edit_time}
                    many={item.content.length}
                />)}
        </div>
    )
}

function List({ title = 'title', last_edit_time, many = 0 }) {
    return (
        <div className={styles.listWrapper}>
            <h3>{title}</h3>
            <div className={styles.listFlex}>
                <p>{many}篇文章</p>
                <p>{last_edit_time}最后修改</p>
            </div>
        </div>
    )
}