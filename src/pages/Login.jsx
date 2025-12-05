import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import images from '../assets/images.png'
import './Login.css'

function Login() {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleLogin() {
    if (mail === '' || password === '') {
      alert("Por favor, preencha todos os campos!")
      return
    }

if (mail === 'admin@remind.com' && password === 'abner123456') {
    alert("Login de admin realizado com sucesso!")
    localStorage.setItem('token', 'token-admin-123') 
    localStorage.setItem('user', JSON.stringify({ name: 'Admin', email: mail }))   
    navigate('/dashboard')
    return
}

    try {
      const response = await api.post('/sessions', {
        email: mail,
        password: password 
      })

      console.log(response.data)
      alert(`Bem-vindo, ${response.data.name}!`)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/dashboard')

    } catch (error) {
      console.error(error)
      alert("Email ou senha incorretos (Erro da API).")
    }
  }

  return (
    <div className="home">
      <img src={images} alt="Logo Remind"/>

      <div className="home-container">
        <h6 className="welcome-title">
          Boas-vindas ao controle de estoque da empresa
        </h6>
        
        <h3>Email Do Usuário</h3>
        <input
          className="input-field"
          type="email"
          placeholder="Digite seu email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        
        <h3>Senha Do Usuário</h3>
        <input
          className="input-field"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        />

        <button className="btn-login" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  )
}

export default Login