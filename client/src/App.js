import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './Signup'
import Quiz from './Quiz'
import Login from './Login'
import Navbar from './Navbar'
import Alert from './Alert'
import Home from './Home'
import Error from './Error'
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/quiz'>
            <Quiz />
          </PrivateRoute>
          <Route exact path='*'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
