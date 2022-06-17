import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        //是否处于登录状态
        isLoggedIn:false,
        //用户信息
        userInfo:{
            //名称
            username:undefined,
            //uuid
            uuid:undefined,
            //github地址
            githubUrl:undefined,
            //掘金地址
            juejinUrl:undefined,
            //思否地址
            sfUrl:undefined,
        },
        //文章草稿
        blobDrafts:[],
        //已发布文章
        blobPublishs:[],
        //收藏夹
        lists:[]
    },
    reducers:{
        //登录
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.userInfo.username=action.payload.username;
            state.userInfo.uuid=action.payload.uuid;
        },
        //登出
        logout:(state)=>{
            state.isLoggedIn=false;
            state.user=null;
        },
        //用户信息
        setUserInfo:(state,action)=>{
            state.userInfo={...state.userInfo,...action.payload};
        },
        //已发布文章
        setPublishBlobs:(state,action)=>{
            state.blobPublishs=action.payload;
        },
        //未发布文章
        setDraftBlobs:(state,action)=>{
            state.blobDrafts=action.payload;
        },
        //收藏夹
        setFavorLists:(state,action)=>{
            state.lists=action.payload;
        },
    }
});

export const {login,logout,setUserInfo,setDraftBlobs,setPublishBlobs,setFavorLists}=userSlice.actions;
//获取用户信息
export const selectUserInfo=state=>state.user.userInfo;
//获取用户已发表文章
export const selectUserBlobsPublish=state=>state.user.blobPublishs;
//获取用户未发表文章
export const selectUserBlobDraft=state=>state.user.blobDrafts;
//获取用户收藏夹
export const selectUserLists=state=>state.user.lists;
export default userSlice.reducer;