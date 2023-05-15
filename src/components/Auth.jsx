import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Auth(props) {
  const auth = useSelector(state => state.auth)
  const location = useLocation()
  return auth.isLogin ? props.children : 
  <Navigate 
  to={'/login'} 
  replace
  state={{location}} />
}
