import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import LogIn from '../pages/login/LogIn'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LogIn/>} />
    </Routes>
  )
}

export default AppRoutes