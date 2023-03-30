import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./redux/features/postSlice";

export default configureStore({
    reducer:{
        app:postReducer,
    }
})