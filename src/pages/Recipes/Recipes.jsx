import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Filter from '../../components/Filter'
import RecipesTable from '../../containers/RecipesTable';
import ActionButtons from '../../containers/ActionButtons';
import {filterListByText} from '../../utils/filters'

const Recipes = () => {
  
  const userLogged = useSelector(state => state.isUserLogged);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [modifyPressed, setModifyPressed] = useState(false);
  const [deletePressed, setDeletePressed] = useState(false);
  const recipeList = useSelector(state => state.recipeList);
  const materialsList = useSelector(state => state.materialsList);

  useEffect(() => setFilteredRecipes(recipeList), [recipeList]);

  const handleFilter = (event) => {
      setFilteredRecipes(filterListByText(recipeList, event.target.value));
      setFilterApplied(true);
  };

  if(!userLogged)
      return <Redirect to='/login'/>
  else if(createPressed)
      return <Redirect to='/criarReceita'/>
  else if(modifyPressed)
      return <Redirect to='/criarReceita'/>
  else if(deletePressed)
      return <Redirect to='/criarReceita'/>
  else return (
    <div className="container">
        <h1> Receitas </h1>

        <Filter handleFilter={handleFilter} placeholder="Filtrar por nome da receita"/>

        <ActionButtons  handleCreate={() => setCreatePressed(true)}
                        handleModify={() => setModifyPressed(true)}
                        handleDelete={() => setDeletePressed(true)}
        />

        <RecipesTable recipesList={filteredRecipes} allMaterials={materialsList}/>
        {(isFilterApplied && filteredRecipes.length===0) && <h3> O filtro não retornou resultados </h3>}
    </div>
  );
};

export default Recipes;
