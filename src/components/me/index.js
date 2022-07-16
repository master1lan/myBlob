import { useDispatch, useSelector } from "react-redux"
import { selectUserInfo, setUserInfo } from "@features/user"
export const UserInfo = (Props) => {
    const DEFAULT_VALUE='未填写';
    const { username, githubUrl, 
        juejinUrl, sfUrl, signature } = useSelector(selectUserInfo);
    return (
        <div {...Props}>
            <div>用户名：{username}</div>
            <div>个性签名：{signature||DEFAULT_VALUE}</div>
            <div>GitHub地址：{githubUrl||DEFAULT_VALUE}</div>
            <div>掘金地址：{juejinUrl||DEFAULT_VALUE}</div>
            <div>思否地址：{sfUrl||DEFAULT_VALUE}</div>
        </div>
    )
}

