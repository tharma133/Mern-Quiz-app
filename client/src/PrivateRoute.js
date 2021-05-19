import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useGlobalContext } from './context'

const PrivateRoute = ({ children, ...rest }) => {
  const { userId } = useGlobalContext()
  return (
    <Route
      {...rest}
      render={() => {
        return userId ? children : <Redirect to='/'></Redirect>
      }}
    ></Route>
  )
}

export default PrivateRoute
