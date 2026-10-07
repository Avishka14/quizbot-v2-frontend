import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogIn from './LogIn'

function LogInRoute() {
  const navigate = useNavigate()

  const handleGoogleLogin = async () => {
    // Will be implemented in the future when we add Google login functionality
    navigate('/')
  }

  const handleCancel = () => {
    // If there's no history (user opened /login directly), go home instead
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return <LogIn onGoogleLogin={handleGoogleLogin} onCancel={handleCancel} />
}

export default LogInRoute