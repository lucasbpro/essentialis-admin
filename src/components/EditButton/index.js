import React from 'react';

import { PencilButton } from './styles'
import { ReactComponent as PencilIcon } from "../../assets/img/edit_icon.svg";

const EditButton = ({onClick}) => {
    return(
        <PencilButton className="trash-button" disabled="true"> 
            <PencilIcon onClick={onClick}/> 
        </PencilButton>
    )
}

export default EditButton;