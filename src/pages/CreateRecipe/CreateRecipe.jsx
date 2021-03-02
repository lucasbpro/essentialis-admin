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
    const [allMaterials, setAllMaterialsList] = useState([]);
    const [selectedOption, setOptionMaterial] = useState();
    const [amount, setAmount] = useState(0);
    const [materialsList, setMaterialsList] = useState([]);
    const [supplyCost, setSupplyCost] = useState(0);

    const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
      
    useEffect(() => {
        getAllMaterials().then(resposta => setAllMaterialsList(resposta));
    },[]);

    useEffect(() => {
    },[materialsList]);

    const handleSubmit = () => {
        const recipeDescription = document.getElementById("recipe").value;

        const newRecipe = {
            "description": recipeDescription,
            "labor_cost" : 0,
            "supply_cost" : supplyCost,
            "materials" : materialsList.map( material => material.id)
        }
        console.log(newRecipe);
        createRecipe(newRecipe, materialsList).then(setRecipeReady(true));
    }

    const handleAddMaterial = () => {
        const newMaterialList = materialsList;
        let newMaterial = {}; 

        // if option is not in the current list and fields are filled
        if(selectedOption!==undefined && amount>0)
            // include new Id in list
            newMaterial = {
                id: selectedOption,
                amount
            };
            newMaterialList.push(newMaterial);

            // updates cost of recipe
            const materialInfo = allMaterials.find(item => item.id === selectedOption);
            if(materialInfo)
                setSupplyCost( supplyCost + amount*materialInfo.package_price/materialInfo.package_amt );

        // updates selected materials Ids
        setMaterialsList(newMaterialList);
    }

    console.log(materialsList)

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
                                    {allMaterials.find(item => item.id === selectedOption)? 
                                        " (" + allMaterials.find(item => item.id === selectedOption).unit_material + ")"
                                        : null
                                    }
                                </Col>
                                <Col className="no-gutters"> </Col>
                            </Row>
                            <Row>
                                <Col className="no-gutters">
                                    <Form.Control   onChange={(e)=>setOptionMaterial(parseInt(e.target.value))} 
                                                    as="select"
                                    >
                                        {allMaterials===undefined? null: allMaterials.map((item, index) => {
                                                return <option key={index} value={`${item.id}`}>
                                                            {item.description} 
                                                       </option>
                                            }
                                        )}
                                    </Form.Control>
                                </Col>
                                <Col className="no-gutters"> 
                                    <Form.Control   as="textarea" 
                                                    rows="1" 
                                                    onChange={(e)=>setAmount(parseInt(e.target.value))}
                                    />
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
                            { (materialsList===[])? null : 
                                materialsList.map((material, index) => {
                                    const materialInfo = allMaterials.find(item => item.id === material.id)
                                    return <li key={index}> 
                                                {materialInfo? `${materialInfo.description + " (" + material.amount + ")"}`
                                                : null} 
                                            </li>
                                })
                            }
                        </ul>

                        { materialsList.length>0 &&
                                <button type="button"
                                className="buttonClearList" 
                                onClick={()=>{ setMaterialsList([]);
                                               setSupplyCost(0);
                                            }
                                        }
                                > 
                                    Limpar lista 
                                </button>
                        }

                        <h4> {"Custo dos Materiais: "+ formatter.format(supplyCost)} </h4>
                    </Form.Group>
                </Form>

                <button onClick={()=>handleSubmit()}> 
                    Criar Receita
                </button>
            </div>
    );
};

export default CreateRecipe;