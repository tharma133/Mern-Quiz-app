import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [user, setUser] = useState([])
  const [userId, setUserId] = useState()
  const [quizId, setQuizId] = useState()
  const [index, setIndex] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [timeout, setTimeOut] = useState(false)
  const [email, setEmail] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState({ type: '', err: '', boolean: false })

  const handleClick = async (e) => {
    e.target.classList.add('click')
    if (e.target.dataset.answer === 'true') {
      setTotal((total) => {
        let newTotal = total + 1
        return newTotal
      })
    } else {
      setTotal((total) => {
        let newTotal = total
        return newTotal
      })
    }
    setTimeout(() => {
      setIndex((oldIndex) => {
        let newIndex = oldIndex + 1
        e.target.classList.remove('click')
        if (newIndex > data.length - 1) {
          handleSubmit()
          newIndex = oldIndex
        }
        return newIndex
      })
    }, 2000)
  }

  const handleSubmit = async () => {
    await axios({
      method: 'PUT',
      url: '/api/v1/submit',
      data: {
        quiz: quizId,
        user: userId,
        totalScore: total,
      },
    })

    setTimeOut(false)
  }

  const handleError = ({ type = '', err = '', boolean = false }) => {
    setError({ type, err, boolean })
    setTimeout(() => {
      setError({ type, err, boolean: false })
    }, 2000)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const req = await axios.get('/api/v1/quiz')
        setData(req.data.data.quiz[0].questions)
        setQuizId(req.data.data.quiz[0]._id)
        setLoading(false)
      } catch (err) {
        handleError({
          type: 'danger',
          err: err.response.data.message
            ? err.response.data.message
            : 'Login after sometimes',
          boolean: true,
        })
      }
    }
    fetchData()
  }, [])
  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        index,
        handleClick,
        handleSubmit,
        email,
        username,
        password,
        passwordConfirm,
        setEmail,
        setUsername,
        setPassword,
        setPasswordConfirm,
        total,
        user,
        userId,
        setUser,
        setUserId,
        timeout,
        setTimeOut,
        error,
        setError,
        handleError,
        loginPassword,
        setLoginPassword,
        loginEmail,
        setLoginEmail,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export default AppProvider
