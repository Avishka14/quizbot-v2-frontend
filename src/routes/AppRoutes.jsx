import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import NotFound from '../pages/not-found/NotFound'
import History from '../pages/history/History'
import Pricing from '../pages/pricing/Pricing'
import HowItWorks from '../pages/how-it-works/HowItWorks'
import Account from '../pages/account/Account'
import LogInRoute from '../routes/LogInRoute'
import RequireAuth from '../components/auth/RequireAuth' // adjust path

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogInRoute />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/how" element={<HowItWorks />} />

      {/* Protected */}
      <Route
        path="/history"
        element={
          <RequireAuth>
            <History />
          </RequireAuth>
        }
      />
      <Route
        path="/account"
        element={
          <RequireAuth>
            <Account />
          </RequireAuth>
        }
      />

      {/* Catch-all last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes