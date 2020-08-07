import React from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

const RecipesTable = ({recipesList}) => { 

		return (
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th> Nome  </th>
                  <th> Materiais </th>
                  <th> Criada em </th>
                  <th> Modificada em </th>
               </tr>
            </thead>

            <tbody>
               {recipesList ? recipesList.map((recipe, index)  => {
				         return <RecipeItem key={index} recipe={recipe}/>
                  }) 
                  : 
                  null
               }
            </tbody>
         </Table>
		);
}

export default RecipesTable;