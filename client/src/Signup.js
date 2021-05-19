import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from './context'
import axios from 'axios'

function Signup() {
  const {
    email,
    username,
    password,
    passwordConfirm,
    setEmail,
    setUsername,
    setPassword,
    setPasswordConfirm,
    setUser,
    setUserId,
    handleError,
  } = useGlobalContext()

  let history = useHistory()

  const signupBtn = async (e) => {
    e.preventDefault()
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/user/signup',
        data: {
          username,
          email,
          password,
          passwordConfirm,
        },
      })
      setUser(res.data.data.user)
      setUserId(res.data.data.user._id)
      handleError({
        type: 'success',
        err: 'You are signed up!. Click Ready to attend quiz.',
        boolean: true,
      })
      setEmail('')
      setUsername('')
      setPassword('')
      setPasswordConfirm('')
      history.push('/')
    } catch (err) {
      setEmail('')
      setUsername('')
      setPassword('')
      setPasswordConfirm('')
      handleError({
        type: 'danger',
        err: err.response.data.message,
        boolean: true,
      })
    }
  }

  return (
    <main className='auth'>
      <form className='container' onSubmit={(e) => signupBtn(e)}>
        <h2 className='signup'>Signup</h2>
        <hr />
        <div className='form-group'>
          <label htmlFor='username'>username</label>
          <input
            type='text'
            placeholder='Enter your name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>password Confirm</label>
          <input
            type='password'
            placeholder='Enter password again'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div className='login-btn'>
          <h5>
            to create new account? <Link to='/login'>Login</Link>{' '}
          </h5>
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

export default Signup
