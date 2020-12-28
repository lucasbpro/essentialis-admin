import React, { useState } from 'react';
//import Menu from '../Menu/Menu'
import LogoEssentialis from '../../assets/img/logo_essentialis.png';
import Menu from '../../assets/img/menu.svg';
import MenuCard from '../../components/MenuCard/MenuCard';
import './Topbar.scss';

const Topbar = ()=> {

	const [menuCard, toggleMenu] = useState(false);

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

			<div className="menu">
				<img
					className="menu-icon" 
					src={Menu} 
					alt="Menu" 
					onClick={() => toggleMenu(!menuCard)}
				/>

				{ menuCard && <MenuCard /> }
			</div>
  		</header>
	);
}

export default Topbar;