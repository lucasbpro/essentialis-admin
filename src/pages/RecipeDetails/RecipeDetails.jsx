import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Table from 'react-bootstrap/Table'
import { getRecipeById } from '../../services';


const RecipeDetails = () => {

  const {recipeId} = useParams();
  const [recipeInfo, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const allMaterials = useSelector(state => state.materialsList);
  const [materialsInfo, setMaterialsInfo] = useState([]);

  useEffect(() => {
     getRecipeById(recipeId).then(recipe => {
        setRecipe(recipe);
        const recipeMaterials = allMaterials.filter(item => Object.keys(recipe.materials).includes(item.id.toString()));
        setMaterialsInfo(recipeMaterials.map( material => {
            return {
                "description":    material.description,
                "amount":         recipe.materials[material.id.toString()],
                "unit_material":  material.unit_material
           };
        }));
      setLoading(false);
      });
  }, [recipeId, recipeInfo, allMaterials]);

  if(loading)
    return <h2> Carregando... </h2>;
  else if( allMaterials.length===0 ){
    return <Redirect to="/"/>
  }
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
            { materialsInfo && materialsInfo.map( (material,index) => {
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
