import React, {useEffect, useState} from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

import {getRecipesMaterialsMap} from '../../services';
import {filterMaterialsByRecipeId} from '../../utils/filters';

const RecipesTable = ({recipesList, allMaterials}) => { 

      const [materialsRecipesMap, setMap] = useState([]);

      useEffect(() => getRecipesMaterialsMap().then(resposta => setMap(resposta)), [])

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