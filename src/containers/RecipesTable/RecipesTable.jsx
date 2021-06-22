import React from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

const RecipesTable = ({recipesList, allMaterials}) => { 

      if (recipesList.length===0)
         return null;
      else return (
            <Table className="table" striped bordered hover>
               <thead>
                  <tr>
                     <th> Nome da Receita </th>
                     <th> Materiais Utilizados </th>
                     <th> </th>
                  </tr>
               </thead>

               <tbody>
                  {recipesList && recipesList.map((recipe, index)  => {

                     const materialsList = allMaterials.filter(item => item.id in recipe.materials);
                     const materialsDescription = materialsList.map(item => item.description);

                     return <RecipeItem key={index} 
                                        recipeId={recipe.id}
                                        recipeDescription={recipe.description} 
                                        materialsDescription={materialsDescription} />
                  })} 
               </tbody>
            </Table>
		);
}

export default RecipesTable;