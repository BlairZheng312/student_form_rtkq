import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/reducer/authSlice'

export default function Menu() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return (
        <div>
            <header>
                <ul>
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    {
                        !auth.isLogin &&
                        <li>
                            <Link to={'/login'}>Login/Register</Link>
                        </li>
                    }
                    {
                        auth.isLogin &&
                        <>
                            <li>
                                <Link to={'/profile'}>{auth.user.username}</Link>
                            </li>
                            <li>
                                <Link to={'/student'}>Student Information</Link>
                            </li>
                            <li>
                                <Link to={'/'} onClick={() => dispatch(logout())}>Logout</Link>
                            </li></>
                    }
                </ul>
            </header>
        </div>
    )
}
