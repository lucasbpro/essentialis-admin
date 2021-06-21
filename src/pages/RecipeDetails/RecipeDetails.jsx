import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Table from 'react-bootstrap/Table'
import { getRecipeById, getMaterialsByIds} from '../../services';


const RecipeDetails = () => {

  const {recipeId} = useParams();
  const [recipeInfo, setRecipe] = useState({});
  const [materialsList, setMaterialsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     getRecipeById(recipeId).then(recipe => {
          setRecipe(recipe);
          getMaterialsByIds(Object.keys(recipe.materials)).then(materialsInfo => {
              setMaterialsList(materialsInfo.map( material => {
                return {
                    "description":    material.description,
                    "amount":         recipe.materials[material.id],
                    "unit_material":  material.unit_material
                };
              }
              ));
              setLoading(false);
          })
     });
  }, [recipeId, recipeInfo]);

  if(loading )
    return <h2> Carregando... </h2>;
  else return (
    <div className="container">
        <h2>{recipeInfo.description}</h2>

        <p>Última atualização em {`${recipeInfo.last_update}`}</p>

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
                       <td>{`${material.amount} ${material.unit_material}`}</td>
                     </tr>
            })}
          </tbody>
        </Table>
    </div>
  );
};

export default RecipeDetails;
