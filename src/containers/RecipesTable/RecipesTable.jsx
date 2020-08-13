import React from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

const RecipesTable = ({recipesList}) => { 

      if (recipesList.length===0)
         return null;
      else return (
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
                  {recipesList.map((recipe, index)  => {
				         return <RecipeItem key={index} recipe={recipe}/>
                  })} 
               </tbody>
            </Table>
		);
}

export default RecipesTable;