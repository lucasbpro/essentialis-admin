import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {Redirect} from 'react-router-dom';
import { setRecipeList, setCustomerList, setOrderList, setMaterialsList } from '../../reducer';

import {getAllRecipes, 
        getAllCustomers,
        getAllOrders,
        getAllMaterials } from '../../services';

import './Home.scss';

const Home = () => {

    const [recipesFetched, setRecipesFetched] = useState(false);
    const [customersFetched, setCustomersFetched] = useState(false);
    const [ordersFetched, setOrdersFetched] = useState(false);
    const [materialsFetched, setMaterialsFetched] = useState(false);

    const userLogged = useSelector(state => state.isUserLogged);
    const dispatch = useDispatch();

    useEffect( ()=> {
        getAllRecipes().then(resposta => dispatch(setRecipeList(resposta))).then(setRecipesFetched(true));
        getAllCustomers().then(resposta => dispatch(setCustomerList(resposta))).then(setCustomersFetched(true));
        getAllOrders().then(resposta => dispatch(setOrderList(resposta))).then(setOrdersFetched(true));
        getAllMaterials().then(resposta => dispatch(setMaterialsList(resposta))).then(setMaterialsFetched(true));
    },[dispatch]);

    if(!userLogged)
        return <Redirect to='/login'/>
    else if(materialsFetched && recipesFetched && customersFetched && ordersFetched)
        return <div className="home">
                    <h2>Usuário Logado! :)</h2>
                    <h2>Tudo pronto! Abra o menu superior para acessar as páginas.</h2>
                </div>
    else
        return <div className="home">
                    <h2>Usuário Logado! :)</h2>
                    <h2>Aguarde um momento... Estamos nos comunicando com o banco de dados.</h2>
                </div>
};

export default Home;
