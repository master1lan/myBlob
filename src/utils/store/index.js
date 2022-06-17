import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@features/user";


export default configureStore({
    /**
     * like reducer:{[xx]:function,}
     */
    reducer:{
        user:userReducer,
    }
});