import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
//import {Redirect} from 'react-router';
//import Loading from '../../components/Loading';

import { getRecipeById, getMaterialsByIds} from '../../services';
//import {filterMaterialsByRecipeId} from '../../utils/filters';

import Table from 'react-bootstrap/Table'

const RecipeDetails = () => {

  const {recipeId} = useParams();
  const [recipeInfo, setRecipe] = useState({});
  const [materialsList, setMaterialsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeById(recipeId).then(recipe => {
        setRecipe(recipe);
        getMaterialsByIds(recipe.materials);
      }).then(materialsInfo => setMaterialsList(materialsInfo));

    setLoading(false);
  }, [recipeId]);

  if(loading )
    return <h2> Carregando... </h2>;
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
              return <tr key={index}> 
                       <td>{material.description}</td>
                       <td>{material.unit_material}</td>
                     </tr>
            })}
          </tbody>
        </Table>
    </div>
  );
};

export default RecipeDetails;
