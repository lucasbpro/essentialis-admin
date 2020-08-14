import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import Pages from '../../pages';
import Topbar from '../Topbar';
//import Menu from '../Menu';
//import Footer from '../../components/Footer';

import './App.scss';
//import 'bootstrap/dist/css/bootstrap.css';

const App = () => {

  return(
      <div className="app">
          <Router>
            <Topbar/>
            {/*isMenuSelected && <Menu/>*/}
            <Pages/>
          </Router>
      </div>
  )
};

export default App;
