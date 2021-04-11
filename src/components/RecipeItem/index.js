import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import {deleteRecipe} from '../../services'
import TrashButton from "../TrashButton"
import {TableItem} from './styles'

function RecipeItem({recipeId, recipeDescription, materialsDescription, modificationDate}){

    const deletarReceita = (recipeId) =>{
        deleteRecipe(recipeId);
        return <Redirect to='/receitas'/>
    }

    return(recipeDescription === undefined? null :
        <TableItem key={recipeId}>
            <td>
                <Link to={`/receita/${recipeId}`}>{recipeDescription}</Link>
                <TrashButton onClick = {() => deletarReceita(recipeId)}/>
            </td>
            <td>
                <ul>
                    {materialsDescription.map((item,index) => {
                        return <li key={index}>{item}</li> 
                    })}
                </ul>
            </td>
        </TableItem>
    );
}

export default RecipeItem;