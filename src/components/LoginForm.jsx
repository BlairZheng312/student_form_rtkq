import React, { useRef, useState } from 'react'
import { useDispatch} from 'react-redux'
import { useLoginMutation, useRegisterMutation } from '../store/api/authApi'
import { login } from '../store/reducer/authSlice'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LoginForm() {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [loginForm, setLoginForm] = useState(true)

  const [registerQuery, { error: registerError }] = useRegisterMutation()
  const [loginQuery, {error: loginError}] = useLoginMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const source = location.state?.location?.pathname || '/'

  const submitHandler = (e) => {
    e.preventDefault()
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    
    if (loginForm) {
      loginQuery({
        identifier: username,
        password
      }).then(res=>{
        if(!res.error){
          dispatch(login({
            token: res.data.jwt,
            user: res.data.user
          }))
          navigate(source, {replace:true})
        }
      })
    } else {
      const email = emailRef.current.value
      registerQuery({
        username,
        email,
        password
      }).then(res=>{
        if(!res.error){
          setLoginForm(true)
        }
      })
    }
  }

  return (
    <div>
      <h2>{loginForm ? 'Login' : 'Register'}</h2>
      <p style={{color:'red'}}>{(!loginForm && registerError) && registerError.data.error.message}</p>
      <p style={{color:'red'}}>{(loginForm && loginError) && loginError.data.error.message}</p>
      <form onSubmit={submitHandler}>
        <div>
          <input type="text" placeholder='username' ref={usernameRef} />
        </div>
        {
          !loginForm &&
          <div>
            <input type="text" placeholder='email' ref={emailRef} />
          </div>
        }
        <div>
          <input type="text" placeholder='password' ref={passwordRef} />
        </div>
        <div>
          <button>{loginForm ? 'Login' : 'Register'}</button>
          <a href="#" onClick={
            (e) => {
              e.preventDefault()
              setLoginForm(!loginForm)
            }
          }>
            {loginForm ? 'No account, register now' : 'Have an account, login now'}
          </a>
        </div>
      </form>
    </div>
  )
}
