import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import {Redirect} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {  getAllMaterials, 
          createRecipe} from '../../services';
//import Loading from '../../components/Loading

import './CreateRecipe.scss';

const CreateRecipe = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    const [recipeReady, setRecipeReady] = useState(false);
    const [materialsList, setMaterialsList] = useState([]);
    const [optionMaterial, setOptionMaterial] = useState();
    const [selectedMaterialsList, setSelectedMaterials] = useState([]);
    const [supplyCost, setSupplyCost] = useState(0);

    useEffect(() => {
        getAllMaterials().then(resposta => setMaterialsList(resposta));
    },[]);

    useEffect(() => {
        
    },[selectedMaterialsList]);

    const handleSubmit = () => {
        const recipeDescription = document.getElementById("recipe").value;

        const newRecipe = {
            "description": recipeDescription,
            "labor_cost" : 0,
            "supply_cost" : supplyCost,
            "materials" : selectedMaterialsList
        }

        console.log(newRecipe);

        createRecipe(newRecipe).then(setRecipeReady(true));
    }

    const handleAddMaterial = () => {
        const newMaterialList = selectedMaterialsList;
        newMaterialList.push(optionMaterial);
        setSelectedMaterials(newMaterialList);
        console.log(selectedMaterialsList)
        //setSupplyCost( supplyCost + materialsList.find(item => item.id === optionMaterial). )
    }

    if(!userLogged)
        return <Redirect to='/login'/>
    else if (recipeReady)
        return <Redirect to="/receitas"/>
    else return (
            <div className="container">
                <h1>Cadastrar Receita</h1> 

                <Form>
                    <Form.Group controlId="recipe">
                        <Form.Label> <h2>Qual o nome da nova receita?</h2> </Form.Label>
                        <Form.Control as="textarea" rows="1" />
                    </Form.Group>

                    <Form.Group controlId="materials">
                        <Form.Label> <h2>Qual a lista de materiais da receita?</h2> </Form.Label>

                        <Container fluid="true">
                            <Row>
                                <Col className="no-gutters"> Material   </Col>
                                <Col className="no-gutters">
                                    Quantidade 
                                    {materialsList.find(item => item.id === optionMaterial)? 
                                        " (" + materialsList.find(item => item.id === optionMaterial).unit_material + ")"
                                        : null
                                    }
                                </Col>
                                <Col className="no-gutters"> </Col>
                            </Row>
                            <Row>
                                <Col className="no-gutters">
                                    <Form.Control onChange={(e)=>setOptionMaterial(parseInt(e.target.value))} as="select">
                                        {materialsList===undefined? null: materialsList.map((item, index) => {
                                                return <option key={index} value={`${item.id}`}>
                                                            {item.description} 
                                                       </option>
                                            }
                                        )}
                                    </Form.Control>
                                </Col>
                                <Col className="no-gutters"> 
                                    <Form.Control as="textarea" rows="1" />
                                </Col>
                                <Col className="no-gutters"> 
                                    <button 
                                        type="button"
                                        className="buttonAdd" 
                                        onClick={()=>handleAddMaterial()}
                                    > 
                                        Adicionar 
                                    </button>
                                </Col>
                            </Row>
                        </Container>

                        <ul>
                            { (selectedMaterialsList===[])? null : 
                                selectedMaterialsList.map((id, index) => {
                                    const material = materialsList.find(material => material.id === id)
                                    return <li key={index}> {material? material.description : null} </li>
                                })
                            }
                        </ul>
                    </Form.Group>
                </Form>

                <button onClick={()=>handleSubmit()}> 
                    Criar Receita
                </button>
            </div>
    );
};

export default CreateRecipe;