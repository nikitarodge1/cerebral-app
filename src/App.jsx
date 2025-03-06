import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthPage from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import './index.css'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'



function App() {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <DashboardPage />
            }
          />
        </Routes>
        <ToastContainer />
        <Tooltip id="my-tooltip" />
      </Router>
    </AuthProvider>
  )
}

export default App
