import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './EstoqueProdutos.css'
import reminder from '../assets/reminder-logo.svg'

function EstoqueProdutos() {
  const navigate = useNavigate()
  
  // Iniciando com dados falsos para teste visual
  const [products, setProducts] = useState([
    { 
      id: 1, 
      name: 'Notebook Dell Latitude', 
      description: 'Notebook i7, 16GB RAM', 
      quantity: 5, 
      price: 4500.00 
    },
    { 
      id: 2, 
      name: 'Mouse Logitech MX', 
      description: 'Mouse sem fio ergonômico', 
      quantity: 12, 
      price: 350.50 
    },
    { 
      id: 3, 
      name: 'Teclado Mecânico', 
      description: 'Switch Blue, RGB', 
      quantity: 8, 
      price: 250.00 
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Verificar se há token válido
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    } loadProducts() 
  }, [navigate])

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]')
    setProducts(storedProducts)
  }

  const handleDelete = (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      const updatedProducts = products.filter(p => p.id !== id)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
    }
  }

  const handleEdit = (product) => {
    localStorage.setItem('editingProduct', JSON.stringify(product))
    navigate('/cadastrar-produto', { state: { editing: true, product } })
  }

  const handleAddProduct = () => {
    // Limpar qualquer produto em edição
    localStorage.removeItem('editingProduct')
    navigate('/cadastrar-produto')
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="manage-page">
      {/* Header Superior */}
      <header className="top-header">
        <div className="logo-placeholder">
          <img src={reminder} alt="Logo Remind"/>
        </div>
        <button className="btn-logout-top" onClick={handleLogout}>
          Sair
        </button>
      </header>

      {/* Container Principal */}
      <div className="main-container">
        <button className="btn-back" onClick={() => navigate('/dashboard')}>
          ← Voltar
        </button>

        <div className="stock-container">
          <h2 className="stock-title">ESTOQUE DOS PRODUTOS</h2>
          <div className="stock-content">
            {products.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum produto cadastrado para visualização.</p>
                <button 
                  className="btn-add-product"
                  onClick={() => navigate('/CadastrarProd')}
                >
                  Cadastrar Produto
                </button>
              </div>
            ) : (
              <div className="products-list">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-details">
                        <span className="product-quantity">
                          Quantidade: <strong>{product.quantity}</strong>
                        </span>
                        {product.price > 0 && (
                          <span className="product-price">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="product-actions">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.id)}
                        title="Excluir"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstoqueProdutos
