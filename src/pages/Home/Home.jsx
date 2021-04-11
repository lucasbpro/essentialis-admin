import React from 'react';
import {useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';

import './Home.scss';

const Home = () => {

    const userLogged = useSelector(state => state.isUserLogged);
  
    if(userLogged){
      return  <div className="home">
                  <h2>Usuário Logado! :) Abra o menu superior para acessar as outras páginas.</h2>
              </div> 
    }
    else return <Redirect to='/login'/>
};

export default Home;
