import React from 'react';
//import '../RecipesFilter.scss';

const RecipesFilter = ({handleFilter}) => {

	return (
		<div className="container-filters">
			<div className="filters__search">
				<input 
					id="text"
					type="text" 
					className="filters__search__input" 
					placeholder="Pesquisar pelo nome da receita" 
					onChange={event => handleFilter(event)}
				/>
  
				<button
				  id="search"
				  className="filters__search__icon"
				  onClick={event => handleFilter(event)}  
				>
				  <i className="fa fa-search"/>
				</button>
			</div>
		</div>
	)
}

export default RecipesFilter;
