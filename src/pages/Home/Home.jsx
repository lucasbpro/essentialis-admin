import React from 'react';

import './Home.scss';

const Home = () => {

  if(0){
    return "larauê"
  }
  else return (
      <form className="home">
          <div class="mb-3">
            <label class="form-label"><h2>Nome de Usuário</h2></label>
            <input type="username" className="input-busca" placeholder="Digite o nome de usuário" />
          </div>

          <div class="mb-3">
            <label class="form-label"><h2>Senha</h2></label>
            <input type="password" className="input-busca" placeholder="***********"/>
          </div>
          
          <button type="submit"> Entrar </button>
      </form>
  );
};

export default Home;
