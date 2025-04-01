import React from 'react'
import {SignUp} from '@clerk/clerk-react'
import './Auth.css'

function SIgnup() {
  return (
    <div className='auth-container'>
      <SignUp />
    </div>
  )
}

export default SIgnup