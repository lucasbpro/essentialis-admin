import React from 'react';
import Confirm from 'react-confirm-bootstrap'

const ConfirmDialog = ({message, onConfirm}) => {

    class ConfirmAction extends React.Component {
        render() {
            return (
                <Confirm
                    onConfirm={()=> onConfirm}
                    body={message}
                    confirmText="Sim, claro!"
                    cancelTex="Oops... não!"
                    title="Tem certeza que deseja fazer isso?">
                    <button>Sim</button>
                </Confirm>
            )
        }
    };

    return <ConfirmAction/>
}

export default ConfirmDialog;