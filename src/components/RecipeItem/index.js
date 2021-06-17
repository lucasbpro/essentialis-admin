import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {deleteRecipe} from '../../services'
import TrashButton from "../TrashButton"
import EditButton from "../EditButton"
import {TableItem} from './styles'

function RecipeItem({recipeId, recipeDescription, materialsDescription}){

    const deletarReceita = (recipeId) =>{
        console.log(recipeId)
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
                    {materialsDescription.map((item,index) => {
                        return <li key={index}>{item}</li> 
                    })}
                </ul>
            </td>
            <td>
                <div>
                    <TrashButton onClick = {() => deletarReceita(recipeId)}/>
                    <EditButton onClick = {() => deletarReceita(recipeId)}/>
                </div>
            </td>
        </TableItem>
    );
}

export default RecipeItem;