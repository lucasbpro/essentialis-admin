import React from 'react';
import {Redirect} from 'react-router-dom';

import {deleteMaterial} from '../../services'
import ActionButtons from "../ActionButtons"
// import DeleteItemModal from "../DeleteItemModal";
import {TableItem} from './styles'

function MaterialItem({id, description, details}){

    const deletarMaterial = (materialId) =>{
        deleteMaterial(materialId);
        return <Redirect to='/receitas'/>
    }

    return(description === undefined? null :
        <TableItem key={id}>
            <td>
                {description}
            </td>
            <td>
                <ul>
                    {details && <h3>{details["Fornecedor"]}</h3>}
                </ul>
            </td>
            <td>
                <ActionButtons handleDelete={() => deletarMaterial(id)} handleEdit={(id) => {}}/>
            </td>
        </TableItem>
    );
}

export default MaterialItem;