import React from 'react'

const Title = ({children}:{children:string}) => {
  return (
    <div className='text-3xl font-bold'>
      {children}
    </div>
  )
}

export default Title
