
import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './views/Home'
import Register from './views/Register'
import Login from './views/Login'
import ProtectedRoute from './componet/ProtectedRoute'
import BaseLayout from './views/BaseLayout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
