import React from 'react';
import { Route, 
         Switch } from 'react-router-dom';

//import Home from './Home';
import NotFound from './NotFound';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './RecipeDetails';
import Orders from './Orders/Orders';
import OrderDetails from './OrderDetails/OrderDetails';

const Pages = () => (
    <Switch>
      <Route exact path="/" component={Recipes} />
      <Route exact path="/receitas" component={Recipes} />
      <Route exact path="/receita/:recipeId" component={RecipeDetails}/>
      <Route exact path="/pedido/:orderId" component={OrderDetails}/>
      <Route exact path="/pedidos" component={Orders}/>
      <Route exact path="/notfound" component={NotFound}/>
      <Route component={NotFound}/>
    </Switch>
);

export default Pages;
