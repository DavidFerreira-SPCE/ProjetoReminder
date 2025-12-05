import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Dashboard.css'
import images from '../assets/images.png'

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
        <div className="logo-placeholder">
         <img src={images} alt="Logo Remind"/>
        </div>
        <button className="btn-logout-top" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Container Principal */}
      <div className="main-container">
        {/* Perfil do Usuário */}
        <div className="user-profile">
          <div className="user-avatar">
            <h2 id='teste'>N/A</h2>
          </div>
          <div className="user-name">
            {user?.name ? `Boas-Vindas, ${user.name}!` : 'Boas-Vindas, Usuário!'}
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="search-container">
          <h1>O QUE DESEJA FAZER AGORA?</h1>
        </div>

        {/* Botões de Ação */}
        <div className="action-buttons">
          <button 
            className="btn-action"
            onClick={() => navigate('/CadastrarProd')}
          >
            CADASTRAR<br/>PRODUTO(S)
          </button>
          <button 
            className="btn-action"
            onClick={() => navigate('/EstoqueProdutos')}
          >
            EDITAR<br/>PRODUTO(S)
          </button>
                    <button 
            className="btn-action"
            onClick={() => navigate('/GerenciarPedidos')}
          >
            GERENCIAR<br/>PEDIDOS
          </button>
                    <button 
            className="btn-action"
            onClick={() => navigate('/EstoqueProdutos')}
          >
            GERENCIAR<br/>ESTOQUE
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard