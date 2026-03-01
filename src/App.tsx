import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { RoleGuard } from './auth/RoleGuard'
import { AdminLayout } from './layouts/AdminLayout/AdminLayout'
import { AuthRedirect } from './pages/AuthRedirect/AuthRedirect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <RoleGuard role="ADMIN">
              <AdminLayout />
            </RoleGuard>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
