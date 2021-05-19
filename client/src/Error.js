import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <main>
      <div className='container'>
        <div className='submit-btn'>
          <Link to='/'>
            <button className='submit'>back to home</button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Error
