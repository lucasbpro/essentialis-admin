import React from 'react';

import { Trash } from './styles'
import { ReactComponent as TrashIcon } from "../../assets/img/trash_icon.svg";

const TrashButton = ({onClick}) => {
    return(
        <Trash className="trash-button"> 
            <TrashIcon onClick={onClick}/> 
        </Trash>
    )
}

export default TrashButton;