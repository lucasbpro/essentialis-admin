import React from 'react';

const OrderFilter = ({handleFilter}) => {

	return (
		<div className="container-filter">
			<h1> Pesquisar Pedidos </h1>
			<input 
				id="text"
				type="text" 
				className="input-busca" 
				placeholder="Digite uma palavra-chave!" 
				onChange={event => handleFilter(event)}
			/>
		</div>
	)
}

export default OrderFilter;