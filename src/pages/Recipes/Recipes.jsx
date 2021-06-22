import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Filter from '../../components/Filter'
import RecipesTable from '../../containers/RecipesTable';
import {filterListByText} from '../../utils/filters'
//import {deleteRecipe} from '../../services';

const Recipes = () => {
  
  const userLogged = useSelector(state => state.isUserLogged);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const recipeList = useSelector(state => state.recipeList);
  const materialsList = useSelector(state => state.materialsList);

  useEffect(() => setFilteredRecipes(recipeList), [recipeList]);

  const handleFilter = (event) => {
      setFilteredRecipes(filterListByText(recipeList, event.target.value));
      setFilterApplied(true);
  };

  if( !userLogged )
      return <Redirect to='/login'/>
  else if( recipeList.length===0 || materialsList.length===0)
    return <Redirect to="/"/>
  else if(createPressed)
      return <Redirect to='/criarReceita'/>
  else return (
    <div className="container">
        <h1> Receitas </h1>

        <Filter handleFilter={handleFilter} placeholder="Filtrar por nome da receita"/>

        <button  className="button-new-item" onClick={()=>setCreatePressed(true)}>	
            Nova Receita 
        </button>

        <RecipesTable recipesList={filteredRecipes} allMaterials={materialsList}/>

        {(isFilterApplied && filteredRecipes.length===0) && 
        <h3 className="filter-no-results"> O filtro não retornou resultados </h3>}
    </div>
  );
};

export default Recipes;
