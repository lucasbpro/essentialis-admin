import React from 'react';
import {TableItem} from './styles'

function RecipeItem({recipe}){

    return(recipe.length === 0? null :
        <TableItem data-testid="recipe" className="recipe">
            <td>{recipe.description}</td>
            <td>{recipe.package_price}</td>
            <td>{recipe.unit_material}</td>
            <td>{recipe.stock_amt}</td>
        </TableItem>
    );
}

export default RecipeItem;