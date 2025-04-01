import React from 'react'
import {SignIn} from '@clerk/clerk-react'
import './Auth.css'

function SIgnin() {
  return (
    <div className='auth-container'>
      <SignIn />
    </div>
  )
}

export default SIgnin 