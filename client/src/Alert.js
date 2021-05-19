import React from 'react'
import { useGlobalContext } from './context'

function Error() {
  const { error } = useGlobalContext()
  return (
    <>
      {error.boolean && (
        <div
          className={`error ${error.type === 'success' && 'success'} ${
            error.type === 'danger' && 'danger'
          }`}
        >
          <p>{error.err}</p>
        </div>
      )}
    </>
  )
}

export default Error
