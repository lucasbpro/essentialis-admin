import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

import './DeleteItemModal.css';

export default function CustomModal(props) {
    const closeModal = <button className="close" type="button" onClick={props.toggleModal}>&times;</button>;

    return (
        <div>
            <Modal size="lg" isOpen={props.isOpen} toggle={props.toggleModal} centered>
                <ModalBody>
                    <div className="closeButtonBox">{closeModal}</div>
                    <div style={{ textAlign: 'center', fontSize: '24px', fontWeight: '700', fontFamily: 'Lato', color: '#2d2d2d' }}> DELETAR MATERIAL </div>
                    <br />
                    <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: '500', fontFamily: 'Lato', color: '#666' }}>
                        {props.message}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};
