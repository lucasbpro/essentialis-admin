import React, {useState, useEffect} from "react";
//import { Link } from "react-router-dom";

import CheckButton from '../../components/CheckButton'
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import {getCompany} from '../../services'


import './CheckList.scss';

const CheckList = () => {

	const  [inputValue, setInputValue] = useState("inicio");
	const [cnpjInfo, setCnpjInfo] = useState({});
	const  [isStoreChecked, setStoreChecked] = useState(false);

	const onClick = () =>{
		setStoreChecked(true); //inputValue.replace(".")
	}

	const processCNPJ = (taxId) => {
		getCompany(taxId)
			.then((company) => setCnpjInfo(company))
			.catch((e) => console.log(e.response.body || `HTTP Error: ${e.response.statusCode}`));
	}

	useEffect(() => {
		//processCNPJ('33.000.167/0001-01')
	}, [])

	return(
		<Container className="checklist-container">	
			<h1>Qual o CNPJ da loja virtual?</h1>
			<input  className="input-loja"
                type="text" 
                placeholder={`__.___.___/____-__`}
                onChange={(event)=>{setInputValue(event.target.value)}}/>

			<Button variant="outline-warning">Warning</Button>

			{isStoreChecked && <h2> {`A loja ${inputValue} é confiável`} </h2>}

		</Container>
	);
};

export default CheckList;
