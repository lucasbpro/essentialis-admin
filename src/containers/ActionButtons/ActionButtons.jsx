import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './ActionButtons.scss';

const ActionButtons = ({ 	selectedItem,
							handleDelete, 
						 	handleCreate, 
						 	handleModify, 	
							itemName				
						})=> {
	return(
		<div className="section" >
			<Container fluid="true">
				<Row className="row-action-buttons">
					<Col> 
						{ !selectedItem? 
							<button  className="button-new-item" onClick={()=>handleCreate()} > 
								Criar item
							</button>
							:
							<button  className="button-disabled" disabled > 
								Criar item
							</button>							
						}
					</Col>
					<Col> 
						{ selectedItem? 
							<button  className="button-modify-item" onClick={()=>handleModify(selectedItem.id)} > 
								Modificar item
							</button>
							:
							<button  className="button-disabled" disabled > 
								Modificar item
							</button>							
						}
					</Col>
					<Col> 
						{ selectedItem? 
							<button  className="button-delete-item" onClick={()=>handleDelete(selectedItem.id)} > 
								Deletar item
							</button>
							:
							<button  className="button-disabled" disabled > 
								Deletar item
							</button>	
						}
					</Col>
				</Row>
			</Container>
      	</div>		
	);
}

export default ActionButtons;