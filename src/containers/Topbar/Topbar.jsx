import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LogoEssentialis from '../../assets/img/logo_essentialis.png';
import MenuIcon from '../../assets/img/menu.svg';
import MenuCard from '../../components/MenuCard/MenuCard';
import './Topbar.scss';

const Topbar = ()=> {

	const userLogged = useSelector(state => state.isUserLogged);
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
					src={MenuIcon} 
					alt="Menu-Icon" 
					onClick={() => toggleMenu(!menuCard)}
				/>

				{ (menuCard && userLogged) && <MenuCard /> }
			</div>
  		</header>
	);
}

export default Topbar;