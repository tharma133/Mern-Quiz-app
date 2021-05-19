import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useGlobalContext } from './context'

function Login() {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    setUser,
    handleError,
    setUserId,
  } = useGlobalContext()

  let history = useHistory()
  const loginBtn = async (e) => {
    e.preventDefault()
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/user/login',
        data: {
          email: loginEmail,
          password: loginPassword,
        },
      })
      setUser(res.data.data.user)
      setUserId(res.data.data.user._id)
      handleError({
        type: 'success',
        err: 'You are logged in!. Click Ready to attend quiz.',
        boolean: true,
      })
      setLoginEmail('')
      setLoginPassword('')
      history.push('/')
    } catch (err) {
      setLoginEmail('')
      setLoginPassword('')
      handleError({
        type: 'danger',
        err: err.response.data.message,
        boolean: true,
      })
    }
  }

  return (
    <main className='auth'>
      <form className='container' onSubmit={(e) => loginBtn(e)}>
        <h2 className='signup'>Login</h2>
        <hr />

        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>

        <div className='submit-btn'>
          <button type='submit' className='submit'>
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}

export default Login
