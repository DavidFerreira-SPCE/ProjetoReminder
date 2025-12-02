import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './EstoqueProdutos.css'
import reminder from '../assets/reminder-logo.svg'

function EstoqueProdutos() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

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
    // Armazenar produto para edição
    localStorage.setItem('editingProduct', JSON.stringify(product))
    navigate('/register-product', { state: { editing: true, product } })
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
          <p className="stock-subtitle">PLACEHOLDER</p>

          <div className="stock-content">
            {products.length === 0 ? (
              <div className="empty-state">
                <p>Nenhum produto cadastrado ainda.</p>
                <button 
                  className="btn-add-product"
                  onClick={() => navigate('/register-product')}
                >
                  Cadastrar Primeiro Produto
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
                        🗑️
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