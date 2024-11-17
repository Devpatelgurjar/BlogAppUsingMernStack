import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Reducers'

export const Store = configureStore({
    reducer: {
        loginUser: userReducer,
    }
})