import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import NotFound from '../pages/not-found/NotFound'
import History from '../pages/history/History'
import Pricing from '../pages/pricing/Pricing'
import HowItWorks from '../pages/how-it-works/HowItWorks'
import Account from '../pages/account/Account'
import LogInRoute from '../routes/LogInRoute'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LogInRoute/>} />
      <Route path="/history" element={<History/>} />
      <Route path="/pricing" element={<Pricing/>} />
      <Route path="/how" element={<HowItWorks/>} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/account" element={<Account/>} />
    </Routes>
  )
}

export default AppRoutes