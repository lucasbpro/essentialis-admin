import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import {Redirect} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { createMaterial } from '../../services';

//import './CreateRecipe.scss';

const CreateMaterial = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    const [materialReady, setMaterialReady] = useState(false);
    const [materialDescription, setMaterialDescription] = useState("");
    const [supplier, setMaterialSupplier] = useState("");
    const [price, setPrice] = useState(0);
    const [unit, setOptionUnit] = useState('g');
    const [amount, setAmount] = useState(0);
    const unitOptions = ['g', 'kg', 'mL', 'L'];
      
    useEffect(() => {
        if ( materialDescription==="" || price===0 || amount===0 )
            document.getElementById("button-create-material").disabled = true;
        else 
            document.getElementById("button-create-material").disabled = false;
    },[materialDescription, supplier, price, amount]);

    const handleSubmit = () => {
        const newMaterial = {
            "description": materialDescription,
            "supplier_name" : supplier,
            "package_amt" : amount, 
            "package_price" : price, 
            "unit_material": unit
        }
        createMaterial(newMaterial).then(setMaterialReady(true));
    }

    if(!userLogged)
        return <Redirect to='/login'/>
    else if (materialReady)
        return <Redirect to="/receitas"/>
    else return (
            <div className="container">
                <h1>Cadastrar Material</h1> 

                <Form>
                    <Form.Group controlId="material">
                        <Form.Label> <h2>Qual o nome do novo material?</h2> </Form.Label>
                        <Form.Control  as="textarea" 
                                       rows="1" 
                                       onChange={(e)=>setMaterialDescription(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group controlId="supplier-name">
                        <Form.Label> <h2>Qual o nome do fornecedor?</h2> </Form.Label>
                        <Form.Control  as="textarea" 
                                       rows="1" 
                                       onChange={(e)=>setMaterialSupplier(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group controlId="package_price">
                        <Form.Label> <h2>Quanto custa o pacote ou frasco desse material?</h2> </Form.Label>
                        <Form.Control   as="input" 
                                        type="number" 
                                        min="0.00" 
                                        max="10000.00" 
                                        step="0.01"
                                        onChange={(e)=>setPrice(parseInt(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="package_amt">
                        <Form.Label> <h2>Qual o volume ou quantidade por pacote ou frasco?</h2> </Form.Label>
                        <Container fluid="true">
                            <Row>
                                <Col className="no-gutters"> Volume ou quantidade   </Col>
                                <Col className="no-gutters"> Unidade   </Col>
                            </Row>

                            <Row>
                                <Col className="no-gutters"> 
                                    <Form.Control   as="input" 
                                                    type="number"
                                                    onChange={(e)=>setAmount(parseInt(e.target.value))}
                                    />
                                </Col>
                                <Col className="no-gutters">
                                    <Form.Control   onChange={(e)=>setOptionUnit(e.target.value)} 
                                                    as="select"
                                    >
                                        {unitOptions.map((item, index) => {
                                            return <option key={index} value={`${item}`}>
                                                        {item} 
                                                    </option>
                                            }
                                    )}
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Form>

                <button id="button-create-material" onClick={()=>handleSubmit()}> 
                    Criar Material
                </button>
            </div>
    );
};

export default CreateMaterial;