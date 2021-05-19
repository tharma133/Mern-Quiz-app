import React from 'react'
import { useHistory } from 'react-router'
import { useGlobalContext } from './context'

function Home() {
  const { userId, handleError, setTimeOut } = useGlobalContext()
  let history = useHistory()
  const handleTimer = () => {
    if (userId) {
      handleError({
        type: 'success',
        err: 'All the best',
        boolean: true,
      })
      setTimeOut(true)
      history.push('/quiz')
    } else {
      handleError({
        type: 'danger',
        err: 'Please Login or Signup',
        boolean: true,
      })
    }
  }

  return (
    <main>
      <div className='container'>
        <h1 className='instruction'>Instructions:</h1>
        <p>
          1. Before start please signup if you don't have an account. If you
          already signup then Login to attend quiz
        </p>
        <p>2. After Logged in You can attend quiz.</p>
        <p>
          3. You have 10 questions with multiple option for each question. Once
          you clicked the option, it will be your answer you can't change it
          again. So think and select option wisely
        </p>
        <p>4. You can attempt this quiz only once</p>
        <p>5. You can know your score at the end</p>
        <div className='submit-btn'>
          {userId ? (
            <button className='submit' onClick={handleTimer}>
              Ready
            </button>
          ) : (
            <button className='submit' onClick={handleTimer}>
              ok
            </button>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
