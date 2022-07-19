import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        //是否处于登录状态
        isLoggedIn: false,
        //用户信息
        userInfo: {
            //名称
            username: undefined,
            //uuid
            uuid: undefined,
            //github地址
            githubUrl: undefined,
            //掘金地址
            juejinUrl: undefined,
            //思否地址
            sfUrl: undefined,
            //个性签名
            signature:null,
            //加入日子
            join_day:undefined,
        },
        //文章草稿
        blobDrafts: [],
        //已发布文章
        blobPublishs: [],
        //收藏夹
        lists: []
    },
    reducers: {
        //登录
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo={...state.userInfo,...action.payload};
        },
        //登出
        logout: (state) => {
            state.isLoggedIn = false;
            state.userInfo={username:undefined,uuid:undefined,githubUrl:undefined,sfUrl:undefined};
            state.blobDrafts=[];
            state.blobPublishs=[];
            state.lists=[];
        },
        //用户信息
        setUserInfo: (state, action) => {
            state.userInfo = { ...state.userInfo, ...action.payload };
        },
        //已发布文章
        setPublishBlobs: (state, action) => {
            state.blobPublishs = action.payload;
        },
        //未发布文章
        setDraftBlobs: (state, action) => {
            state.blobDrafts = action.payload;
        },
        //收藏夹
        setFavorLists: (state, action) => {
            state.lists = action.payload;
        },
        //新增收藏夹
        addFavorList: (state, action) => {
            state.lists.push(action.payload);
        },
        //移除收藏夹
        removeFavorList: (state, action) => {
            state.lists = state.lists.filter(item=>item._id !== action.payload._id);
        },
        //收藏某篇文章
        favorBlobToList:(state,action)=>{
            const list=state.lists.find(item=>item._id===action.payload.list_id);
            list.content.push(action.payload.blob_id);
        },
        //取消收藏某篇文章
        unfavorBlobToList:(state,action)=>{
            const list=state.lists.find(item=>item._id===action.payload.list_id);
            list.content=list.content.filter(item=>item!==action.payload.blob_id);
        },
    }
});

export const { login, logout,
    setUserInfo, setDraftBlobs, setPublishBlobs, setFavorLists,
    addFavorList, removeFavorList,favorBlobToList,unfavorBlobToList } = userSlice.actions;
//获取用户信息
export const selectUserInfo = state => state.user.userInfo;
//获取用户已发表文章
export const selectUserBlobsPublish = state => state.user.blobPublishs;
//获取用户未发表文章
export const selectUserBlobDraft = state => state.user.blobDrafts;
//获取用户收藏夹
export const selectUserLists = state => state.user.lists;


export default userSlice.reducer;