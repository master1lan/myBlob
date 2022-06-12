import { createSlice } from "@reduxjs/toolkit";

export const userSlice=createSlice({
    name:'user',
    initialState:{
        isLoggedIn:false,
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.isLoggedIn=true;
            state.user=action.payload;
        },
        logout:(state)=>{
            state.isLoggedIn=false;
            state.user=null;
        }
    }
});
export const {login,logout}=userSlice.actions;
export const selectUserInfo=state=>{
    return {
        isLoggedIn:state.user.isLoggedIn,
        user:state.user.user
    }
};
export default userSlice.reducer;