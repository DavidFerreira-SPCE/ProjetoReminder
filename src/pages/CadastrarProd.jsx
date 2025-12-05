import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './CadastrarProd.css'
import images from '../assets/images.png'

function RegisterProduct() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.quantity) {
      alert('Preencha os campos obrigatórios!')
      return
    }

    // Pegar produtos existentes do localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]')
    
    const newProduct = {
      id: Date.now(),
      name: formData.name,
      branch: formData.branch,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price || 0),
      createdAt: new Date().toISOString()
    }

    // Salvar no localStorage
    localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]))
    
    alert('Produto cadastrado com sucesso!')
    setFormData({ name: '', description: '', quantity: '', price: '' })
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="register-page">
      {/* Header Superior */}
      <header className="top-header">
        <div className="logo-placeholder">
          <img src={images} alt="Logo Remind"/>
        </div>
      </header>

      {/* Container Principal */}
      <div className="main-container">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>

        <div className="form-container">
          <h2 className="form-title">CADASTRAR PRODUTO</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nome do Produto *"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="description"
                placeholder="Marca Do Produto *"
                value={formData.branch}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-row">
              <input
                type="number"
                name="quantity"
                placeholder="Quantidade *"
                value={formData.quantity}
                onChange={handleInputChange}
                className="form-input-small"
                min="0"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Preço(R$)"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input-small"
                step="0.01"
                min="0"
              />
            </div>

            <button type="submit" className="btn-submit">
              CADASTRAR
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterProduct