import React from 'react';
import {Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ActionButtons from "../ActionButtons"
import {deleteMaterial} from '../../services'
import {TableItem} from './styles'
import { toggleThrowModal } from '../../reducer';


function MaterialItem({id, description, details, recipes}){

    const dispatch = useDispatch();

    const deletarMaterial = (materialId) =>{
        if(recipes.length > 0)
            dispatch(toggleThrowModal()); //console.log("não pode");
        else{
            deleteMaterial(materialId);
            return <Redirect to='/materiais'/>
        }
    }

    return(description === undefined? null :
        <TableItem key={id}>
            <td>
                {description}
            </td>
            <td>
                <ul>
                    { Object.keys(details).map( (key) => {
                        return <li key={key}> {`${key}: ${details[key]}`} </li>
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