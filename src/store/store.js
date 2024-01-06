import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import featureSlice from "./slices/featureSlice";


const store = configureStore({
    reducer :{
        User : userSlice,
        AuthShow : featureSlice,
    }
})

export default store;