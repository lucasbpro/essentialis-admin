import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import {Redirect} from 'react-router-dom';

import {login} from '../../services';
import {toggleUserLogged} from '../../reducer';

import './Login.scss';

const Login = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(undefined);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [loginButtonClicked, setLoginClicked] = useState(false);
 
  useEffect(() => {
      if(accessAllowed)
          dispatch(toggleUserLogged());
  },[dispatch, accessAllowed])

  const handleLogin = () => {
      login(username, password).then(response => {
          if(response.access_token){
              setToken(response.access_token)
              setAccessAllowed(true)
          }
          else 
              setAccessAllowed(false)
      });
      
      setLoginClicked(true)
  }

  if(accessAllowed){
    return <Redirect to='/'/>
  }
  else return (
      <form className="login-form">
        <div className="mb-3">
          <label className="form-label"><h2>Nome de Usuário</h2></label>
          <input  type="username"
                  className="input-busca" 
                  onChange={(event)=>setUsername(event.target.value)}
                  placeholder="Digite o nome de usuário" />
        </div>

        <div className="mb-3">
          <label className="form-label"><h2>Senha</h2></label>
          <input  type="password"
                  className="input-busca"
                  onChange={(event)=>setPassword(event.target.value)}
                  placeholder="***********"/>
        </div>
        
        <button onClick={handleLogin}> Entrar </button>

        {loginButtonClicked && <h3> Usuário ou senha não conferem. </h3>}
      </form>
  );
};

export default Login;