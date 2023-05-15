import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return {
                isLogin: false,
                token: null,
                user: null,
                expiryTime: 0
            }
        }
        return {
            isLogin: true,
            token,
            user: JSON.parse(localStorage.getItem('user')),
            expiryTime: +localStorage.getItem('expiryTime')
        }
    },
    reducers: {
        login(state, action) {
            state.isLogin = true;
            state.token = action.payload.token;
            state.user = action.payload.user

            const currentTime = Date.now()
            const timeout = 1000 * 60 * 60 * 24
            // const timeout = 1000 * 5

            state.expiryTime = currentTime + timeout

            localStorage.setItem('token', state.token)
            localStorage.setItem('user', JSON.stringify(state.user))
            localStorage.setItem('expiryTime', state.expiryTime + '')
        },
        logout(state) {
            state.isLogin = false;
            state.token = null;
            state.user = null

            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('expiryTime')
        }
    }
})

export const {
    login,
    logout
} = authSlice.actions