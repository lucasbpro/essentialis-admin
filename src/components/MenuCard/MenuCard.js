import React from 'react';
import { Link } from 'react-router-dom';
import './MenuCard.css';

function MenuCard() {
    return (
      <div className="menu-card">
        <Link to={'/pedidos'}>
          <p className="card-options"> Pesquisar pedidos </p>
        </Link>
        <Link to={'/receitas'}>
          <p className="card-options"> Pesquisar receitas </p>
        </Link>
        <Link to={'/criarCliente'}>
          <p className="card-options"> Cadastrar cliente </p>
        </Link>
        <Link to={'/criarPedido'}>
          <p className="card-options"> Cadastrar pedido </p>
        </Link>
        <Link to={'/criarReceita'}>
          <p className="card-options"> Cadastrar receita </p>
        </Link>
        <Link to={'/criarMaterial'}>
          <p className="card-options"> Cadastrar material </p>
        </Link>
      </div>
    );
  }
  
  export default MenuCard;