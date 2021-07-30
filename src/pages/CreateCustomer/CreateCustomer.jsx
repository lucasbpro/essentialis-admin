import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form'
import {Redirect} from "react-router-dom";
import {DateInput} from '@opuscapita/react-dates';

import { createCustomer } from '../../services';


const CreateCustomer = () => {

    const userLogged = useSelector(state => state.isUserLogged);

    const [customerName, setName] = useState("");
    const [customerEmail, setEmail] = useState("");
    const [customerReady, setCustomerReady] = useState(false);
    const [selectedDate, setBirthDate] =  useState("");

    const handleSubmit = () => {
        if(selectedDate){
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            const year = selectedDate.getFullYear();

            const newCustomer = {
                "name": customerName,
                "email": customerEmail,
                "birth_date": day + '/' + month + '/' + year
            };

            createCustomer(newCustomer);
            setCustomerReady(true);
        }
    }

    if(!userLogged)
        return <Redirect to='/login'/>
    else if (customerReady)
        return <Redirect to="/pedidos"/>
    else return (
        <div className="container">
            <h1>Cadastrar Cliente</h1> 

            <Form>
                <Form.Group>
                    <Form.Label> <h2>Digite o nome do novo cliente :)</h2> </Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> <h2>Qual o e-mail dela(e)?</h2> </Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> <h2>Em que dia ela(e) nasceu?</h2> </Form.Label>
                    <DateInput 
                        value={selectedDate}
                        dateFormat="dd/MM/yyyy"
                        locale="pt-br"
                        onChange={(e) => setBirthDate(e)}
                        style={{"width":"100%"}}
                    />
                </Form.Group>
            </Form>

            <button classname="button-new-item" onClick={()=>handleSubmit()}> 
                Cadastar Cliente
            </button>
        </div>
    );
};

export default CreateCustomer;
