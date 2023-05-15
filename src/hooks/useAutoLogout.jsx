import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/reducer/authSlice';

export default function useAutoLogout() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        const timeout = auth.expiryTime - Date.now()
        if (timeout <= 3000) {
            dispatch(logout())
            return
        }
        const timer = setTimeout(() => {
            dispatch(logout())
        }, timeout)

        return () => {
            clearTimeout(timer)
        }

    }, [auth])
}
