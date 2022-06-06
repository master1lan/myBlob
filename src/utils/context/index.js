import { useContext, useEffect, useState, createContext } from "react";
import Cookie from "js-cookie";
import api from "@utils/api";
const userContext=createContext({
    isLoggedIn:false,
    user:null,
    setUser:null
});
/**
 * 这个proview的目的就是不用redux，直接将用户状态放里面
 */
const UserProview=({children})=>{
    const [user,setUser]=useState(null);
    //打开界面首先查看是否有jwt
    useEffect(()=>{
        //我直接从cookie里面拿jwt
        const jwt=Cookie.get('jwt');
        if(jwt){
            //检查jwt是否失效或者就是随便注入的
            fetch(api.userLoginWithjwt,{
                headers:{
                    Authorization:jwt,
                }
            }).then(res=>res.json()).then(res=>{
                if(res.code!==200){
                    //过期的直接给你移除
                    Cookie.remove('jwt');
                }else{
                    setUser({
                        uuid:res.data.uuid,
                        username:res.data.username
                    });                    
                }
            })
        }
    },[]);
    return(
        <userContext.Provider value={{
            user,
            setUser,
            isLoggedIn:!!user
            }} >
            {children}
         </userContext.Provider>
    )
}
export const userLogin=()=>{
    return useContext(userContext);
}

export default UserProview;