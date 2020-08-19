import React from 'react';
//import '../RecipesFilter.scss';

const RecipesFilter = ({handleFilter}) => {

	return (
		<div className="container-filter">
			<h1> Pesquisar Receita </h1>
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

export default RecipesFilter;