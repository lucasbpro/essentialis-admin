import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
//import {Redirect} from 'react-router';
//import Loading from '../../components/Loading';

import {getRecipesMaterialsMap, getRecipeById, getMaterialsByIds} from '../../services';
import {filterMaterialsByRecipeId} from '../../utils/filters';

import Table from 'react-bootstrap/Table'

const RecipeDetails = () => {

  const {recipeId} = useParams();
  const [recipeInfo, setRecipe] = useState([]);
  const [materialsIds, setMaterialsIds] = useState([]);
  const [recipesMaterialsMap, setMap] = useState([]);
  const [materialsList, setMaterialsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeById(recipeId).then(receita => setRecipe(receita))
  }, [recipeId]); 

  useEffect(() => {
    getRecipesMaterialsMap().then(resposta => setMap(resposta))
  }, [recipeInfo]);

  useEffect(() => {
      setMaterialsIds(filterMaterialsByRecipeId(recipesMaterialsMap, recipeId));
  },[recipesMaterialsMap, recipeId]);

  useEffect(() => {
    getMaterialsByIds(materialsIds).then(resposta => setMaterialsList(resposta));
    setLoading(false);
  }, [materialsIds]);

  if(loading || recipeInfo.length===0 || materialsList.lenght===0)
    return <h2>Carregando...</h2>;
  else return (
    <div className="container">
        <h2>{recipeInfo.description}</h2>

        <p>Última atualização em {`${recipeInfo.modificada_em}`}</p>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th> Material </th>
              <th> Quantidade </th>
            </tr>
          </thead>

          <tbody>
            { materialsList && materialsList.map( (material,index) => {
              const mapItem = recipesMaterialsMap.find( item => 
                                    (item.recipe_id === recipeInfo.id) && (item.material_id === material.id));
              return <tr key={index}> 
                       <td>{material.description}</td>
                       <td>{mapItem && `${mapItem.amount} ${material.unit_material}`}</td>
                     </tr>
            })}
          </tbody>
        </Table>
    </div>
  );
};

export default RecipeDetails;
