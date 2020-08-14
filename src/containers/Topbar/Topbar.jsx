import React from 'react';

import LogoEssentialis from '../../assets/img/logo_essentialis.png';
import './Topbar.scss';

const Topbar = ()=> {

	return(
		<header data-testid="topbar" className="topbar">
			<div className="topbar_logo">
				<a href="/"> 
					<img className="topbar_logo" src={LogoEssentialis} alt="Logo-Essentialis"/>  
				</a>
			</div>
			<p> Essentialis Admin </p>

			<button className="menu-icon"> 
				<i className="fa fa-bars" aria-hidden="true"/> 
			</button>
  		</header>
	);
}

export default Topbar;