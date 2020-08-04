import React from 'react';

//import Loading from '../../components/Loading';
//import {URL_API} from "../../constants";
//import {updateProductList} from '../../actions';

import CheckList from '../../containers/CheckList'
import './Home.scss';

const Home = () => {

  return (
    <div data-testid="home" className="home">
        <CheckList/>
    </div>
  );
};

export default Home;
