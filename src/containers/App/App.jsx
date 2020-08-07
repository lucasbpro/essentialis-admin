import React from 'react';

//import { BrowserRouter as Router } from 'react-router-dom';
//import Routes from '../../routes';

import Topbar from '../Topbar';
import Home from '../../pages/Home'
import Recipes from '../../pages/Recipes'
//import Footer from '../../components/Footer';

import './App.scss';
//import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
  return(
      <div data-testid="app" className="app">
          <Topbar/>
          <Recipes/>
      </div>
  )
};

export default App;
