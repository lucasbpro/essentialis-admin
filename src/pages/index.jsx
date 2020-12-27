import React from 'react';
import { Route, 
         Switch } from 'react-router-dom';

//import Home from './Home';
import NotFound from './NotFound';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './RecipeDetails';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import CreateOrder from './CreateOrder';

const Pages = () => (
    <Switch>
      <Route exact path="/" component={Orders} />
      <Route exact path="/receitas" component={Recipes} />
      <Route exact path="/receita/:recipeId" component={RecipeDetails}/>
      <Route exact path="/pedido/:orderId" component={OrderDetails}/>
      <Route exact path="/pedidos" component={Orders}/>
      <Route exact path="/criarPedido" component={CreateOrder}/>
      <Route exact path="/notfound" component={NotFound}/>
      <Route component={NotFound}/>
    </Switch>
);

export default Pages;
