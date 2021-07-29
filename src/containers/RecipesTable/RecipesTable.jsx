import React, {useEffect, useState} from "react";
import Table from 'react-bootstrap/Table'
import {Redirect} from 'react-router-dom';

import RecipeItem from '../../components/RecipeItem';
import {deleteRecipe as deleteRecipeAPI} from '../../services'

const RecipesTable = ({recipesList, allMaterials}) => { 

   const [recipeList, setRecipeList] = useState(recipesList);
   const [redirectEdit, setRedirectEdit] = useState(false);
   const [recipeToEdit, setRecipeToEdit] = useState(0);

   const deleteRecipe = (recipeId) =>{
      deleteRecipeAPI(recipeId);
      let newList = recipeList.filter(item => item.id !== recipeId);
      setRecipeList(newList);
   }

   const editRecipe = (recipeId)  => {
      setRecipeToEdit(recipeId);
      setRedirectEdit(true);
   }

   useEffect( () => {
      setRecipeList(recipesList);
   },[setRecipeList, recipesList])

   if (recipeList.length===0)
      return <h1> Sem receitas </h1>;
   else if (redirectEdit)
      return <Redirect to={`/receita/${recipeToEdit}`}/> 
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
            {recipeList && recipeList.map((recipe, index)  => {

               const materialsList = allMaterials.filter(item => item.id in recipe.materials);
               const materialsDescription = materialsList.map(item => item.description);

               return <RecipeItem key={index} 
                                    recipeId={recipe.id}
                                    recipeDescription={recipe.description} 
                                    materialsDescription={materialsDescription} 
                                    handleDelete={()=> deleteRecipe(recipe.id)} 
                                    handleEdit={()=> editRecipe(recipe.id)} />
            })} 
         </tbody>
      </Table>
   );
}

export default RecipesTable;