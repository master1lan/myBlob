import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@features/user/userSlice";


export default configureStore({
    /**
     * like reducer:{[xx]:function,}
     */
    reducer:{
        user:userReducer,
    }
});