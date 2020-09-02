import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';

import {getAllRecipes, getAllMaterials} from '../../services';

import RecipeFilter from '../../components/RecipeFilter'
import RecipesTable from '../../containers/RecipesTable';
import './Recipes.scss';

import {filterListByText} from '../../utils/filters'

const Recipes = () => {

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

  const handleFilter = (event) => {
      setFilteredRecipes(filterListByText(recipesList, event.target.value))
      setFilterApplied(true)
  }

  return (
    <div className="container">
        <RecipeFilter handleFilter={handleFilter}/>
        {(isFilterApplied && filteredRecipes.length===0) && <h3> O filtro não retornou resultados </h3>}
        {isFilterApplied && <RecipesTable recipesList={filteredRecipes} allMaterials={allMaterials}/>}
    </div>
  );
};

export default Recipes;
