import { configureStore } from "@reduxjs/toolkit";

import testReducer from "@features/test";
import userReducer from "@features/user/userSlice";


export default configureStore({
    /**
     * like reducer:{[xx]:function,}
     */
    reducer:{
        test:testReducer,
        user:userReducer,
    }
});