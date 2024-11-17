import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLogin: false,
}

const userReducer = createSlice(
    {
    name: "user",
    initialState,
    reducers: {
        login(state){
            state.isLogin = true;
        },
        logout(state){
            state.isLogin = false;
        },
               }  
    }
)

export const {login,logout} = userReducer.actions;
export default userReducer.reducer;