import React from 'react';

//import { BrowserRouter as Router } from 'react-router-dom';
//import Routes from '../../routes';

import Topbar from '../Topbar';
//import Home from '../../routes/Home'
//import Footer from '../../components/Footer';

import './App.scss';

const App = () => {
  return(
      <div data-testid="app" className="app">
          <Topbar/>
      </div>
  )
};

export default App;
