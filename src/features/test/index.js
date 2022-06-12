import {createSlice} from "@reduxjs/toolkit"

export const testSlice=createSlice({
    name:'test',
    initialState:{
        value:0
    },
    reducers:{
        increment:state=>{
            state.value++;
        },
        decrement:state=>{
            state.value--;
        },
        incrementByAmount:(state,action)=>{
            state.value+=action.payload;
        }
    }
});
export const {increment,decrement,incrementByAmount} =testSlice.actions;
export const selectTest=state=>state.test.value;
export default testSlice.reducer;