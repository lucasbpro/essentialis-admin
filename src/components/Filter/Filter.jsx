import React from 'react';

const Filter = ({handleFilter, placeholder}) => {

	return (
		<div className="container-filter">
			<input 
				id="text"
				type="text" 
				className="input-busca" 
				placeholder= {placeholder}
				onChange={event => handleFilter(event)}
			/>
		</div>
	)
}

export default Filter;
