import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/SearchSlice"

export const Store = configureStore({
    reducer:{
        search:searchReducer
    }
})