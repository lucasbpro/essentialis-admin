import React from 'react';

import TrashButton from "../TrashButton";
import EditButton from "../EditButton";

const ActionButtons = ({ handleDelete, handleEdit })=> {

	return(
		<div style={{display: 'flex', flexDirection: 'column'}}>
			<div style={{flex:0.5}}>
				<TrashButton onClick = {handleDelete} />
			</div>
			<div style={{flex:0.5}}>
				<EditButton onClick = {handleEdit} />
			</div>
		</div> 
	);
}

export default ActionButtons;