import { configureStore} from "@reduxjs/toolkit";
import studentApi from "./studentApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


const store = configureStore({
    reducer: {
        [studentApi.reducerPath]:studentApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentApi.middleware)
})

setupListeners(store.dispatch)

export default store