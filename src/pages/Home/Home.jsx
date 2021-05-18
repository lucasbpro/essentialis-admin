import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';
import { setRecipeList, setCustomerList, setOrderList, setMaterialsList } from '../../reducer';

import {getAllRecipes, 
        getAllCustomers,
        getAllOrders,
        getAllMaterials } from '../../services';

import './Home.scss';

const Home = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    const dispatch = useDispatch();

    getAllRecipes().then(resposta => dispatch(setRecipeList(resposta)));
    getAllCustomers().then(resposta => dispatch(setCustomerList(resposta)));
    getAllOrders().then(resposta => dispatch(setOrderList(resposta)));
    getAllMaterials().then(resposta => dispatch(setMaterialsList(resposta)));

    if(userLogged){
      return  <div className="home">
                  <h2>Usuário Logado! :) Abra o menu superior para acessar as outras páginas.</h2>
              </div> 
    }
    else return <Redirect to='/login'/>
};

export default Home;
