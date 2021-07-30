import React from 'react';
import { Link } from 'react-router-dom';

import ActionButtons from "../ActionButtons"
import {TableItem} from './styles'

function RecipeItem({recipeId, recipeDescription, materialsDescription, handleDelete, handleEdit}){

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
                <ActionButtons  handleDelete={handleDelete} 
                                handleEdit={handleEdit}
                />
            </td>
        </TableItem>
    );
}

export default RecipeItem;