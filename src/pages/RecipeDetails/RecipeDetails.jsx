import React, {useState, useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import Table from 'react-bootstrap/Table'
import { getRecipeById, updateRecipe } from '../../services';


const RecipeDetails = () => {

  const {recipeId} = useParams();
  const [recipeInfo, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [recipeModified, setModified] = useState(false);
  const [newRecipeMaterials, setNewMaterials] = useState({});
  const [materialsInfo, setMaterialsInfo] = useState([]);

  const allMaterials = useSelector(state => state.materialsList);

  useEffect(() => {
     getRecipeById(recipeId).then(recipe => {
        setRecipe(recipe);
        setNewMaterials({...recipe.materials});
        const recipeMaterials = allMaterials.filter(item => Object.keys(recipe.materials).includes(item.id.toString()));
        setMaterialsInfo(recipeMaterials.map( material => {
            return {
                "material_id":    material.id,
                "description":    material.description,
                "amount":         recipe.materials[material.id.toString()],
                "unit_material":  material.unit_material
           };
        }));
      });
  },[allMaterials, recipeId]);


  useEffect(() => {
    materialsInfo.map( item => {
      let inputField = document.getElementById("material-"+item.material_id);
      inputField.value = item.amount;
      return 1;
    });
    setLoading(false);
  },[materialsInfo]);

  
  const modifyMaterial = (materialId, newAmount) => {
    let materialsAmount = {...newRecipeMaterials};
    materialsAmount[materialId] = parseFloat(newAmount);
    setNewMaterials(materialsAmount);
    setModified(true);
  }

  const updateRecipeMaterials = () => {
    let newRecipe = {...recipeInfo};
    newRecipe.materials = newRecipeMaterials;
    updateRecipe(newRecipe);
  }

  const restoreOriginalValues = () => {
    const originalMaterials = materialsInfo.map( item => {
      return {
          "material_id":    item.material_id,
          "description":    item.description,
          "amount":         recipeInfo.materials[item.material_id.toString()],
          "unit_material":  item.unit_material
      }
    });
    setMaterialsInfo(originalMaterials);
    setNewMaterials(recipeInfo.materials);
    setModified(false);
  };

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
                        <td>
                          <input  id={`material-${material.material_id}`}
                                  type="number" 
                                  min={0.1} 
                                  onChange={(e)=>modifyMaterial(material.material_id, e.target.value)}/>
                          {` ${material.unit_material}`}
                        </td>
                     </tr>
            })}
          </tbody>
        </Table>
        
        <div style={{"display": "flex", "flexDirection":"row"}}>
          <button  className={recipeModified? "button-update":"button-update-disabled"} 
                  disabled={recipeModified? false : true}
                  onClick = {()=>updateRecipeMaterials()}>	
              Atualizar
          </button>

          <button  className={recipeModified? "button-restore":"button-restore-disabled"} 
                  disabled={recipeModified? false : true}
                  onClick = {()=>restoreOriginalValues()}>	
              Cancelar alterações
          </button>
        </div>


    </div>
  );
};

export default RecipeDetails;