import React from 'react'
import { Toaster } from 'sonner'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: 'ios-toast',
          },
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App