import { useState } from 'react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './GerenciarPedidos.css';
import images from '../assets/images.png'

export default function OrderManagementSystem() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: 'Notebook Dell',
      brand: 'Dell',
      category: 'Eletrônicos',
      qtde: 2,
      status: 'Pendente'
    },
    {
      id: 2,
      productName: 'Mouse Logitech',
      brand: 'Logitech',
      category: 'Periféricos',
      qtde: 5,
      status: 'Aprovado'
    }
  ]);

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="logo-button">
           <img src={images} alt="Logo Remind"/>
        </div>
      
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={24} />
          VOLTAR
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="title-wrapper">
          <h1 className="title">SISTEMA DE GERENCIAMENTO DOS PEDIDOS</h1>
        </div>

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Do Produto</th>
                <th>Marca Do Produto</th>
                <th>Categoria</th>
                <th>Qtde</th>
                <th>Status Do Pedido</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.productName}</td>
                  <td>{order.brand}</td>
                  <td>{order.category}</td>
                  <td>{order.qtde}</td>
                  <td>{order.status}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-edit">
                        <Edit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="btn-delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Empty rows */}
              {[...Array(6 - orders.length)].map((_, index) => (
                <tr key={`empty-${index}`} className="empty-row">
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}