import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';

import RecipeFilter from '../../components/RecipeFilter'
import RecipesTable from '../../containers/RecipesTable';
import './Recipes.scss';

import {filterByText} from '../../utils/filters'

const Recipes = () => {

  const URL_RECIPES = "http://localhost:8000/raw_materials";
  const [recipesList, setRecipes] = useState([]);
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

  const handleFilter = (event) => {
      setFilteredRecipes(filterByText(recipesList, event.target.value))
      setFilterApplied(true)
  }


  return (
    <div data-testid="recipes" className="recipes">
        <RecipeFilter handleFilter={handleFilter}/>
        {isFilterApplied && <RecipesTable recipesList={filteredRecipes}/>}
    </div>
  );
};

export default Recipes;
