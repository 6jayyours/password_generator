import React from 'react'
import { useSelector } from 'react-redux';

const User = () => {
  const username = useSelector((state) => state.password.username);
  
  return (
    <div>
        <div>
            <h1 className='text-2xl font-semibold text-violet-900'>Hi {username} !</h1>
        </div>
    </div>
  )
}

export default User