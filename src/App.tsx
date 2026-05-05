import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { RoleGuard } from './auth/RoleGuard'
import { AdminLayout } from './layouts/AdminLayout/AdminLayout'
import { AuthRedirect } from './pages/AuthRedirect/AuthRedirect'
import { Dashboard } from './pages/Dashboard/Dasboard'
import { UserLayout } from './layouts/AdminLayout/UserLayout'

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
        <Route path='/app/*' element={
          <ProtectedRoute>
            <RoleGuard role="USER">
              <UserLayout />
            </RoleGuard>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
