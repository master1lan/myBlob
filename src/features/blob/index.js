import { createSlice } from "@reduxjs/toolkit";

/**
 * 某篇博客的数据
 */
export const BlobSlice = createSlice({
    name: 'blob',
    initialState: {
        //作者
        author: undefined,
        //github地址
        githubUrl: undefined,
        //掘金地址
        juejinUrl: undefined,
        //思否地址
        sfUrl: undefined,
        //个性签名
        signature: undefined,
        //头像url
        logoUrl: undefined,
    },
    reducers: {
        viewBlob: (state, action) => {
            Object.entries(action.payload).forEach(([key,value])=>state[key]=value);
        },
    }
});

export const { viewBlob } = BlobSlice.actions;

export const selectBlobInfo = state => state.blob;

export default BlobSlice.reducer;