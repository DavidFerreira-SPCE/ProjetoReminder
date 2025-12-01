import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="dashboard-page">
      {/* Header Superior */}
      <header className="top-header">
        <div className="logo-placeholder"></div>
        <button className="btn-logout-top" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Container Principal */}
      <div className="main-container">
        {/* Perfil do Usuário */}
        <div className="user-profile">
          <div className="user-avatar"></div>
          <div className="user-name">{user?.name || 'Usuário'}</div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Pesquisar produtos..."
          />
        </div>

        {/* Botões de Ação */}
        <div className="action-buttons">
          <button className="btn-action">
            CADASTRAR<br/>PRODUTO(S)
          </button>
          <button className="btn-action">
            GERENCIAR<br/>ESTOQUE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard