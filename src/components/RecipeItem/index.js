import React from 'react';
import {TableItem} from './styles'

function RecipeItem({recipeDescription, materialsDescription}){

    return(recipeDescription === undefined? null :
        <TableItem data-testid="recipe" className="recipe">
            <td>{recipeDescription}</td>
            <td>{materialsDescription.map(item => {
                    return <p>{item}</p>
                })}
            </td>
            <td>{`Hoje`}</td>
        </TableItem>
    );
}

export default RecipeItem;