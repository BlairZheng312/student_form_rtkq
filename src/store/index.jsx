import { configureStore} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import studentApi from "./api/studentApi";
import { authApi } from './api/authApi'
import { authSlice } from './reducer/authSlice'


const store = configureStore({
    reducer: {
        [studentApi.reducerPath]:studentApi.reducer,
        [authApi.reducerPath]: authApi.reducer,       
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
        studentApi.middleware,
        authApi.middleware)
})

setupListeners(store.dispatch)

export default store