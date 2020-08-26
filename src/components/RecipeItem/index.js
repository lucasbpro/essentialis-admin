import React from 'react';
import {TableItem} from './styles'

function RecipeItem({recipeDescription, materialsDescription, modificationDate}){

    return(recipeDescription === undefined? null :
        <TableItem data-testid="recipe" className="recipe">
            <td>{recipeDescription}</td>
            <td>
                <ul>
                    {materialsDescription.map(item => {return <li>{item}</li> })}
                </ul>
            </td>
            <td>{modificationDate}</td>
        </TableItem>
    );
}

export default RecipeItem;