import { useGlobalContext } from './context'

function App() {
  const { data, loading, index, handleClick, timeout, total } =
    useGlobalContext()

  if (loading) {
    return (
      <main>
        <div className='container'>
          <h1 className='loading'>Loading...</h1>
        </div>
      </main>
    )
  }

  if (!timeout) {
    return (
      <main>
        <div className='container total'>
          <h2>Your Score is : {total} </h2>
          <h3>Thank you for attending the quiz!</h3>
        </div>
      </main>
    )
  }

  const { question, options, score } = data[index]
  return (
    <main>
      <div className='question-index'>
        <h2>Question {index + 1}</h2>
      </div>
      <div className='container'>
        <div className='question-container'>
          <h1>{question}</h1>
          <div className='btn-container'>
            {options.map((option, index) => {
              const { text, isCorrect } = option
              return (
                <button
                  key={index}
                  className='btn'
                  data-answer={isCorrect}
                  data-score={score}
                  onClick={(e) => {
                    handleClick(e)
                  }}
                >
                  {text}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
