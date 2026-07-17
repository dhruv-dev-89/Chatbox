import React from 'react'
import { Routes,Route } from 'react-router-dom'
import ChatHome from './pages/ChatHome'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './routes/ProtectedRoute'
const App = () => {
  return (
    <div>
      <Routes>
        <Route 
        path='/chats' 
        element={
        <ProtectedRoute>
          <ChatHome/>
        </ProtectedRoute>}
        />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/' element={<RegisterPage/>}/>
      </Routes>
    </div>
  )
}

export default App