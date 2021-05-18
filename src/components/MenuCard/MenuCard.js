import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';

function MenuCard() {
    return (
      <div className="menu-card">
        <Link to={'/pedidos'}>
          <p className="card-options"> Pedidos </p>
        </Link>
        <Link to={'/receitas'}>
          <p className="card-options"> Receitas </p>
        </Link>
        <Link to={'/materiais'}>
          <p className="card-options"> Materiais </p>
        </Link>
        <Link to={'/criarCliente'}>
          <p className="card-options"> Clientes </p>
        </Link>
      </div>
    );
  }
  
  export default MenuCard;