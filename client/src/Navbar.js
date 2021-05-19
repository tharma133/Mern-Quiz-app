import { Link } from 'react-router-dom'
import { useGlobalContext } from './context'

function Navbar() {
  const { user, userId } = useGlobalContext()

  return (
    <div className='nav'>
      <div className='navbar'>
        <div className='btns'>
          {userId ? (
            <div className='nav-flex'>
              <h1>Quiz</h1>
              <div>
                <h3 className='user'>{user && user.username}</h3>
              </div>
            </div>
          ) : (
            <div className='nav-flex'>
              <h1>Quiz</h1>
              <div>
                <Link to='/login'>
                  <button className='log'>Login</button>
                </Link>
                <Link to='/signup'>
                  <button className='sign'>Signup</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
