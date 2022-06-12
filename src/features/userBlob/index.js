import {createSlice} from "@reduxjs/toolkit";

export const userBlobSlice=createSlice({
    name:'userBlob',
    initialState:{
        lists:[]
    },
    reducers:{
        getBlobs:(state,action)=>{
            state.lists.push(...action.payload);
        }
    }
});

export const {getBlobs}=userBlobSlice.actions;
export const selectUserBlobs=state=>state.userBlobs.lists;
export default userBlobSlice.reducer;