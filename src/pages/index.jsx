import React from 'react';
import { Route, 
         Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import Recipes from './Recipes/Recipes';
import RecipeDetails from './RecipeDetails';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import CreateOrder from './CreateOrder';
import CreateCustomer from './CreateCustomer';
import CreateRecipe from './CreateRecipe';

const Pages = () => (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/receitas" component={Recipes} />
      <Route exact path="/receita/:recipeId" component={RecipeDetails}/>
      <Route exact path="/pedido/:orderId" component={OrderDetails}/>
      <Route exact path="/pedidos" component={Orders}/>
      <Route exact path="/criarReceita" component={CreateRecipe}/>
      <Route exact path="/criarPedido" component={CreateOrder}/>
      <Route exact path="/criarCliente" component={CreateCustomer}/>
      <Route exact path="/notfound" component={NotFound}/>
      <Route component={NotFound}/>
    </Switch>
);

export default Pages;
