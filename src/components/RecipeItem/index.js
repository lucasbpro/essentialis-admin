import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {deleteRecipe} from '../../services'
import ActionButtons from "../ActionButtons"
import {TableItem} from './styles'

function RecipeItem({recipeId, recipeDescription, materialsDescription}){

    const deletarReceita = (recipeId) =>{
        deleteRecipe(recipeId);
        return <Redirect to='/receitas'/>
    }

    return(recipeDescription === undefined? null :
        <TableItem key={recipeId}>
            <td>
                <Link to={`/receita/${recipeId}`}>{recipeDescription}</Link>
            </td>
            <td>
                <ul>
                    {materialsDescription && materialsDescription.map((item,index) => {
                        return <li key={index}>{item}</li> 
                    })}
                </ul>
            </td>
            <td>
                <ActionButtons handleDelete={()=>deletarReceita(recipeId)} handleEdit={()=> {}}/>
            </td>
        </TableItem>
    );
}

export default RecipeItem;