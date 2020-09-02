import React from 'react';
import { Route, 
         Switch } from 'react-router-dom';

//import Home from './Home';
import NotFound from './NotFound';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './RecipeDetails';

const Pages = () => (
    <Switch>
      <Route exact path="/" component={Recipes} />
      <Route exact path="/receitas" component={Recipes} />
      <Route exact path="/receita/:recipeId" component={RecipeDetails}/>
      <Route component={NotFound}/>
    </Switch>
);

export default Pages;
