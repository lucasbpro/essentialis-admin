import React from 'react';
import {Link} from 'react-router-dom';

import {TableItem} from './styles'

function RecipeItem({recipeId, recipeDescription, materialsDescription}){

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
                <input type="checkbox" onChange={()=>{}} />
            </td>
        </TableItem>
    );
}

export default RecipeItem;