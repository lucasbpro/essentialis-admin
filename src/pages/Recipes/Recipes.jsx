import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';

import RecipeFilter from '../../components/RecipeFilter'
import RecipesTable from '../../containers/RecipesTable';
import './Recipes.scss';

import {filterListByText} from '../../utils/filters'

const Recipes = () => {

  const URL_RECIPES = "http://localhost:8000/recipes";
  const URL_MATERIALS = "http://localhost:8000/raw_materials";

  const [recipesList, setRecipes] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      fetch(URL_RECIPES)
        .then(async (response) => {
          if (response.ok) {
            const resposta = await response.json();
            setRecipes(resposta);
            return;
          }
          throw new Error(`Error when communicating with server at ${URL_RECIPES}`);
        });
    }
  }, [])

  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      fetch(URL_MATERIALS)
        .then(async (response) => {
          if (response.ok) {
            const resposta = await response.json();
            setAllMaterials(resposta);
            return;
          }
          throw new Error(`Error when communicating with server at ${URL_MATERIALS}`);
        });
    }
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
