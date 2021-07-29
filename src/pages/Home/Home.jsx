import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';
import { setRecipeList, setCustomerList, setOrderList, setMaterialsList } from '../../reducer';

import {getAllRecipes, 
        getAllCustomers,
        getAllOrders,
        getAllMaterials } from '../../services';

const Home = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    const dispatch = useDispatch();

    useEffect( ()=> {
        getAllRecipes().then(resposta => dispatch(setRecipeList(resposta)));
        getAllCustomers().then(resposta => dispatch(setCustomerList(resposta)));
        getAllOrders().then(resposta => dispatch(setOrderList(resposta)));
        getAllMaterials().then(resposta => dispatch(setMaterialsList(resposta)));
    },[dispatch]);

    if(!userLogged)
        return <Redirect to='/login'/>
    else return <div className="container">
                    <h2>Usuário Logado! :)</h2>
                    <h2>Abra o menu superior para acessar as páginas.</h2>
                </div>
};

export default Home;
