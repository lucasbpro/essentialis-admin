import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import CustomModal from '../../components/CustomModal';

import {  getAllMaterials, 
          createRecipe     } from '../../services';

import './CreateRecipe.scss';

const CreateRecipe = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    const [recipeReady, setRecipeReady] = useState(false);
    const [allMaterials, setAllMaterialsList] = useState([]);
    const [selectedOption, setOptionMaterial] = useState(1);
    const [amount, setAmount] = useState(0);
    const [materialsList, setMaterialsList] = useState([]);
    const [supplyCost, setSupplyCost] = useState(0);
    const [recipeName, setRecipeName] = useState("");
    const [laborCost, setLaborCost] = useState(5.0);
    const [productivity, setProductivity] = useState(1);
    const [enableCreateRecipe, setEnable] = useState(false);

    const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});
      
    useEffect(() => {
        getAllMaterials().then(resposta => setAllMaterialsList(resposta));
    },[]);

    useEffect(() => {
    },[materialsList]);

    const handleSubmit = () => {
        const newRecipe = {
            "description":      recipeName,
            "labor_cost" :      laborCost,
            "supply_cost" :     supplyCost,
            "productivity" :    productivity,
            "materials" :       materialsList.reduce((dict,material) => ({...dict, 
                                                 [material.id]: material.amount}), {})
        }
        createRecipe(newRecipe).then(setRecipeReady(true));
    }

    const handleAddMaterial = () => {
        const newMaterialList = materialsList;
        const materialIds = materialsList.map( item => item.id );

        // if option is not in the current material list and amount is not empty
        if( !materialIds.includes(selectedOption) && amount>0){
            // include new material in list of materials
            let newMaterial = {
                    id: selectedOption,
                    amount, 
                    unit: allMaterials.find(item => item.id === selectedOption).unit_material 
            };
            newMaterialList.push(newMaterial);
            setEnable(true);

            // update cost of recipe accordingly
            const materialInfo = allMaterials.find(item => item.id === selectedOption);
            if(materialInfo)
                setSupplyCost( supplyCost + amount*materialInfo.package_price/materialInfo.package_amt );

            // update recipe's materials
            setMaterialsList(newMaterialList);
        }
        else{

        }
    }


    if(!userLogged)
        return <Redirect to='/login'/>
    else if (recipeReady)
        return <Redirect to="/receitas"/>
    else return (
            <div className="container">
                <h1>Cadastrar Receita</h1> 

                <Form>
                    <Container fluid="true"  className="container-form">
                        <Row>
                            <Col xs={7}>
                                <h3> Qual o nome da nova receita? </h3>
                            </Col>
                            <Col xs={5} style={{"padding":"0"}}>
                                <Form.Control as="textarea" rows="1" 
                                      onChange={(e)=>setRecipeName(e.target.value)}/>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid="true" className="container-form">
                        <Row>
                            <Col xs={7}>
                                <h3> Qual o rendimento da receita? </h3>
                            </Col>
                            <Col xs={5} style={{"padding":"0"}}>
                                <Form.Control as="input" type="number" placeholder={`${productivity}`}
                                        onChange={(e)=>setProductivity(e.target.value)}/>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid="true"  className="container-form">
                        <Row>
                            <Col xs={7}>
                                <h3> Qual o custo de produção? </h3>
                            </Col>
                            <Col xs={5} style={{"padding":"0"}}>
                                <Form.Control as="input" type="number" min={0.1} placeholder={`${laborCost}`}
                                            onChange={(e)=>setLaborCost(parseFloat(e.target.value))}/>                       
                            </Col>  
                        </Row>
                    </Container>

                    <Form.Group controlId="materials">
                        <h3> Quais são os ingredientes da receita? </h3>

                        <Container fluid="true">
                            <Row>
                                <Col className="no-gutters"> Material </Col>
                                <Col className="no-gutters">
                                    Quantidade 
                                    {allMaterials.find(item => item.id === selectedOption)? 
                                        " (" + allMaterials.find(item => item.id === selectedOption).unit_material + ")"
                                        : null
                                    }
                                </Col>
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
                                    <Form.Control   as="input" type="number"  min={0.1} 
                                                    onChange={(e)=>setAmount(parseInt(e.target.value))}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="no-gutters"> 
                                    <button type="button"
                                            className={amount>0? "button-update" : "button-update-disabled"}
                                            onClick={()=>handleAddMaterial()}
                                            disabled={amount>0? false : true}> 
                                        Adicionar 
                                    </button>
                                </Col>
                                <Col className="no-gutters">
                                    { materialsList.length>0 &&
                                        <button type="button"
                                                className="button-restore" 
                                                onClick={()=>{  setMaterialsList([]);
                                                                setEnable(false);
                                                                setSupplyCost(0);
                                                        }}> 
                                            Limpar lista 
                                        </button>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                </Form>

                <Container fluid="true"  className="container-form">
                    { materialsList.length>0 && 
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <h2> Detalhes da Receita: </h2> 
                            <h3> {recipeName} </h3>
                        </div>
                    }

                    { materialsList.length>0 && 
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th> Materiais </th>
                                    <th> Quantidade </th>
                                </tr>
                            </thead>

                            <tbody>
                                {(materialsList===[])? null : materialsList.map((material, index) => {
                                    const materialInfo = allMaterials.find(item => item.id === material.id)
                                    return  <tr key={index}> 
                                                <th>{materialInfo? `${materialInfo.description}`: null}</th>
                                                <th>{materialInfo? material.amount + " " + material.unit : null}</th> 
                                            </tr>
                                })}

                                <tr style={{"background":"gray"}}>
                                    <th> Custo Total </th>
                                    <th style={{"color":"green"}}> 
                                        {formatter.format(supplyCost + laborCost)}
                                    </th>
                                </tr>
                            </tbody>
                        </Table>
                }
                </Container>

                <button className={enableCreateRecipe? null : "button-disabled"}
                        onClick={()=>handleSubmit()} 
                        disabled={!enableCreateRecipe}> 
                    Criar Receita
                </button>

                <CustomModal props={{isOpen: true, 
                                     message:"Teste de mensagem",
                                     toggleModal: true}} />
            </div>
    );
};

export default CreateRecipe;