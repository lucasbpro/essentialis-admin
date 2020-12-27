import React from 'react';
import Menu from '../Menu/Menu'
import LogoEssentialis from '../../assets/img/logo_essentialis.png';
import './Topbar.scss';

const Topbar = ()=> {

	return(
		<header className="topbar">
			<div>
				<a href="/"> 
					<img className="topbar-logo" src={LogoEssentialis} alt="Logo-Essentialis"/>  
				</a>
			</div>
			
			<div>
				<a href="/" className="topbar-title"> 
					Essentialis Admin
				</a>
			</div>

			<button className="menu-icon"> 
				<i className="fa fa-bars" aria-hidden="true"/> 
				<Menu/>
			</button>
  		</header>
	);
}

export default Topbar;