import { configureStore } from "@reduxjs/toolkit";

import userReducer from "@features/user";
import blobReducer from "@features/blob";

export default configureStore({
    /**
     * like reducer:{[xx]:function,}
     */
    reducer:{
        user:userReducer,
        blob:blobReducer,
    }
});