import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CadastrarProd from './pages/CadastrarProd.jsx'
import EstoqueProdutos from './pages/EstoqueProdutos.jsx'
import GerenciarPedidos from './pages/GerenciarPedidos.jsx'
import './index.css'

function App() {
  console.log('App carregado!')
  
  // Função para verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null
  }

  // Componente para rotas protegidas
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/CadastrarProd" 
        element={
          <ProtectedRoute>
            <CadastrarProd />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/EstoqueProdutos" 
        element={
          <ProtectedRoute>
            <EstoqueProdutos/>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/GerenciarPedidos" 
        element={
          <ProtectedRoute>
            <GerenciarPedidos />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App