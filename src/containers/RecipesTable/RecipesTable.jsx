import React, {useEffect, useState} from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

import {filterMaterialsByRecipeId} from '../../utils/filters'

const RecipesTable = ({recipesList, allMaterials}) => { 

      const URL_RECIPE_MATERIALS = "http://localhost:8000/recipes_materials";

      const [materialsRecipesMap, setMap] = useState([]);

      useEffect(() => {
         if (window.location.href.includes('localhost')) {
           fetch(URL_RECIPE_MATERIALS)
             .then(async (response) => {
               if (response.ok) {
                 const resposta = await response.json();
                 setMap(resposta);
                 return;
               }
               throw new Error(`Error when communicating with server at ${URL_RECIPE_MATERIALS}`);
             });
         }
       }, [])


      if (recipesList.length===0)
         return null;
      else return (
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th> Nome  </th>
                     <th> Materiais </th>
                     <th> Modificada em </th>
                  </tr>
               </thead>

               <tbody>
                  {recipesList.map((recipe, index)  => {
                     const materialsIds = filterMaterialsByRecipeId(materialsRecipesMap, recipe.id);
                     const materialsList = allMaterials.filter(item => materialsIds.includes(item.id))
                     const materialsDescription = materialsList.map(item => item.description)

                     return <RecipeItem key={index} 
                                        recipeDescription={recipe.description} 
                                        materialsDescription={materialsDescription} />
                  })} 
               </tbody>
            </Table>
		);
}

export default RecipesTable;