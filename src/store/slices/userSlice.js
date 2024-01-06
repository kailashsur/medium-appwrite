import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    status : false,
    userData : null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers :{
        login : (state, action)=>{
            state.status = true ;
            state.userData = action.payload;
            // localStorage.setItem('userData', JSON.stringify(state.userData));
        },
        logout: (state, action)=>{
            state.status = false;
            state.userData = null;
            // localStorage.removeItem('userData');
        }
    }

})

export default userSlice.reducer;
export const {login, logout } = userSlice.actions;