import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    authShow : false
}

const featureSlice = createSlice({
    name : "authShow",
    initialState,
    reducers :{
        statusTrue : (state, actions)=>{
            state.authShow = true ;
        },
        statusFalse: (state, actions)=>{
            state.authShow = false;
        }
    }

})

export default featureSlice.reducer;
export const {statusTrue, statusFalse } = featureSlice.actions;