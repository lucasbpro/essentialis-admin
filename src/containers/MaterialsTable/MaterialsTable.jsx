import React from "react";
import RecipeItem from '../../components/RecipeItem';
import Table from 'react-bootstrap/Table'

const MaterialsTable = ({materialsList, allMaterials}) => { 

      if (materialsList.length===0)
         return null;
      else return (
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th> Nome da Receita </th>
                     <th> Materiais Utilizados </th>
                  </tr>
               </thead>

               <tbody>
                  {materialsList && materialsList.map((material, index)  => {
                     return <RecipeItem key={index} 
                                        recipeId={material.id}
                                        recipeDescription={material.description} />
                  })} 
               </tbody>
            </Table>
		);
}

export default MaterialsTable;