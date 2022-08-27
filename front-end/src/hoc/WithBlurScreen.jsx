import React from 'react'

export default function WithBlurScreen(WrappedComponent) {
  return (props) => (
    <div className='blur-screen'>
      <WrappedComponent {...props} />
    </div>
  )
}
