import { configureStore } from "@reduxjs/toolkit";

import testReducer from "@features/test";

export default configureStore({
    /**
     * like reducer:{[xx]:function,}
     */
    reducer:{
        test:testReducer
    }
});