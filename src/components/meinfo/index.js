import { useState, useRef } from "react";
import {  useDispatch,useSelector } from "react-redux";
import styles from "./me.module.css";
import { selectUserInfo, setUserInfo } from "@features/user"
import message from "@utils/message";
import { uploadImg, UpdateUserInfo } from "@utils/fetchData";

export const UserInfo = (Props) => {
    const DEFAULT_VALUE = '';
    const dispatch = useDispatch();
    const { username=DEFAULT_VALUE, 
        githubUrl=DEFAULT_VALUE, 
        juejinUrl=DEFAULT_VALUE, 
        sfUrl=DEFAULT_VALUE, 
        signature=DEFAULT_VALUE, logoUrl } = useSelector(selectUserInfo);
    const [form, setForm] = useState({ username, githubUrl, juejinUrl, sfUrl, signature, logoUrl }),
        changeHander = (label_name) => (e) => setForm({ ...form, [label_name]: e.target.value }),
        setImgUrl = (url) => setForm({ ...form, logoUrl: url }),
        clickHander = async() => {
            await UpdateUserInfo(form);
            dispatch(setUserInfo(form));
        };
    return (
        <div
            className={styles.wrapper}
            {...Props}>
            <div className={styles.infoInput}>
                <form>
                    <FormItemInput label_name={'用户名'} maxLen={30}
                        value={form.username || DEFAULT_VALUE} placeholder={'在这里填入用户名'}
                        onChange={changeHander('username')}
                    />
                    <FormItemInput label_name={'GitHub地址'} maxLen={50}
                        value={form.githubUrl || DEFAULT_VALUE} placeholder={'在这里填入你的GitHub地址'}
                        onChange={changeHander('githubUrl')}
                    />
                    <FormItemInput label_name={'掘金地址'} maxLen={50}
                        value={form.juejinUrl || DEFAULT_VALUE} placeholder={'在这里填入你的掘金地址'}
                        onChange={changeHander('juejinUrl')}
                    />
                    <FormItemInput label_name={'思否地址'} maxLen={50}
                        value={form.sfUrl || DEFAULT_VALUE} placeholder={'在这里填入你的思否地址'}
                        onChange={changeHander('sfUrl')}
                    />
                    <FormItemTextArea label_name={'个性签名'} maxLen={200}
                        value={form.signature || DEFAULT_VALUE} placeholder={'你的个性签名'}
                        onChange={changeHander('signature')}
                    />
                </form>
                <button className={styles.saveButtom} onClick={clickHander}>保存修改</button>
            </div>
            <div className={styles.avatarInput}>
                {/* 头像地方 */}
                <UserImg logoUrl={form.logoUrl} setImgUrl={setImgUrl} />
            </div>
        </div>
    )
}

function UserImg({ logoUrl, setImgUrl }) {
    const imgRef = useRef(null);
    const changeHander = async () => {
        const img = imgRef?.current.files[0];
        if (!img?.type.startsWith('image/')) {
            message.error("文件类型不允许");
            return;
        }
        if (img?.size > 5 * 1024 * 1024) {
            message.error("文件大小超过典型值5Mb");
            return;
        }
        //还剩下上传
        const url = await uploadImg(img);
        setImgUrl(url);
        message.success('头像上传成功');
    }
    return (
        <div className={styles.avatarInfo}>
            <div className={styles.avatarInfo_upload}>
                <div
                    className={styles.avatarInfo_hover}
                    onClick={() => imgRef?.current.click()}
                >
                    <i>
                        <svg viewBox="0 0 1024 1024" >
                            <path d="M464.883436 464.883436V302.244035A23.732788 23.732788 0 0 
                            1 488.616224 279.209271h46.069529a23.732788 23.732788 0 0 1 23.732788 
                            23.034764v162.639401h162.6394a23.732788 23.732788 0 0 1 23.034765 
                            23.732788v46.069529a23.732788 23.732788 0 0 1-23.034765 
                            23.732788H558.418541v162.6394a23.732788 23.732788 0 0 1-23.732788 
                            23.034765H488.616224a23.732788 23.732788 0 0 1-23.732788-23.034765V558.418541H302.244035A23.732788 23.732788 
                            0 0 1 279.209271 534.685753V488.616224a23.732788 23.732788 0 0 1 23.034764-23.732788z m46.767552 465.581458a418.813906 
                            418.813906 0 1 0-418.813906-418.813906 418.813906 418.813906 0 0 0 418.813906 418.813906z m0 92.837083a511.650988 511.650988 
                            0 1 1 511.650989-511.650989 511.650988 511.650988 0 0 1-511.650989 511.650989z" ></path>
                        </svg>
                    </i>
                    <div>点击修改头像</div>
                </div>
                <img
                    className={styles.avatarInfo_img}
                    src={logoUrl}
                />
                <input ref={imgRef} type="file" accept="image/*" className={styles.userImg_upload} onChange={changeHander}></input>
            </div>
            <div>我的头像</div>
            <div>支持jpg、png、jpeg格式大小5M以内的图片</div>
        </div>
    )
}



function FormItemInput({ label_name, maxLen, value, placeholder, onChange }) {
    return (
        <div className={styles.formItem}>
            <label className={styles.formItem_label}>{label_name}</label>
            <div className={styles.formItem_content}>
                <div className={styles.formItem_input_div}>
                    <input className={styles.formItem_input}
                        type="text"
                        placeholder={placeholder}
                        onChange={onChange}
                        maxLength={maxLen} value={value} />
                    <span className={styles.formItem_suffix}>
                        <span>{value?.length || 0}/{maxLen}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

function FormItemTextArea({ label_name, maxLen, value, placeholder, onChange }) {
    return (
        <div className={styles.formItem}>
            <label className={styles.formItem_label}>{label_name}</label>
            <div className={styles.formItem_content}>
                <div className={styles.formItem_input_div}>
                    <textarea className={styles.formItem_input}
                        rows="2"
                        style={{
                            height: "120px"
                        }}
                        type="text"
                        placeholder={placeholder}
                        onChange={onChange}
                        maxLength={maxLen} value={value} />
                    <span className={styles.textarea_suffix}>
                        <span>{value?.length || 0}/{maxLen}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
