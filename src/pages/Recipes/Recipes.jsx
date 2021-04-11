import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
//import Loading from '../../components/Loading';

import {getAllRecipes, getAllMaterials} from '../../services';

import RecipeFilter from '../../components/RecipeFilter'
import RecipesTable from '../../containers/RecipesTable';

import {filterListByText} from '../../utils/filters'
import { useSelector } from 'react-redux';

const Recipes = () => {

  const userLogged = useSelector(state => state.isUserLogged);

  const [recipesList, setRecipes] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    getAllRecipes().then(resposta => setRecipes(resposta));
  }, [])

  useEffect(() => {
    getAllMaterials().then(resposta => setAllMaterials(resposta))
  }, [])

  useEffect(() => {
    setFilteredRecipes(recipesList);
  }, [recipesList, allMaterials])

  const handleFilter = (event) => {
      setFilteredRecipes(filterListByText(recipesList, event.target.value))
      setFilterApplied(true)
  }

  if(!userLogged)
      return <Redirect to='/login'/>
  else return (
    <div className="container">
        <RecipeFilter handleFilter={handleFilter}/>
        <RecipesTable recipesList={filteredRecipes} allMaterials={allMaterials}/>
        {(isFilterApplied && filteredRecipes.length===0) && <h3> O filtro não retornou resultados </h3>}
    </div>
  );
};

export default Recipes;
