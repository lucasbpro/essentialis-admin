import React from 'react';
import {Redirect} from 'react-router-dom';

import ActionButtons from "../ActionButtons"
import {deleteMaterial} from '../../services'
import {TableItem} from './styles'

function MaterialItem({id, description, details}){

    const deletarMaterial = (materialId) =>{
        deleteMaterial(materialId);
        return <Redirect to='/materiais'/>
    }

    return(description === undefined? null :
        <TableItem key={id}>
            <td>
                {description}
            </td>
            <td>
                <ul>
                    { Object.keys(details).map( (key) => {
                        return <li> {`${key}: ${details[key]}`} </li>
                      })
                    }
                </ul>
            </td>
            <td>
                <ActionButtons handleDelete={()=>deletarMaterial(id)} handleEdit={()=> {}}/>
            </td>
        </TableItem>
    );
}

export default MaterialItem;