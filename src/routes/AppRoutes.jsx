import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import LogIn from '../pages/login/LogIn'
import NotFound from '../pages/not-found/NotFound'
import History from '../pages/history/History'
import Pricing from '../pages/pricing/Pricing'
import About from '../pages/about/About'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LogIn/>} />
      <Route path="/history" element={<History/>} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/about" element={<About/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  )
}

export default AppRoutes