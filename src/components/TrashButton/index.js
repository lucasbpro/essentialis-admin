import React from 'react';

import { Button } from './styles'
import { ReactComponent as TrashIcon } from "../../assets/img/trash_icon.svg";

const TrashButton = ({onClick}) => {
    return(
        <Button onClick={onClick} > 
            <TrashIcon/> 
        </Button>
    )
}

export default TrashButton;