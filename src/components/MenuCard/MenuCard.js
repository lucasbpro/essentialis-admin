import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';

function MenuCard() {
    return (
      <div className="menu-card">
        <Link to={'/pedidos'}>
          <p className="card-options"> Listar pedidos </p>
        </Link>
        <Link to={'/criarCliente'}>
          <p className="card-options"> Cadastrar cliente </p>
        </Link>
        <Link to={'/criarPedido'}>
          <p className="card-options"> Cadastrar pedido </p>
        </Link>
      </div>
    );
  }
  
  export default MenuCard;