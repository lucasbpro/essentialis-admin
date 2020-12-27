import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import {Redirect} from "react-router-dom";
import {DateInput} from '@opuscapita/react-dates';

import { createCustomer } from '../../services';
//import Loading from '../../components/Loading


const CreateCustomer = () => {

    const [customerName, setName] = useState("");
    const [customerEmail, setEmail] = useState("");
    const [customerReady, setCustomerReady] = useState(false);
    const [selectedDate, setBirthDate] =  useState("");

    const handleSubmit = () => {

        const day = String(selectedDate.getDate()).padStart(2, '0');
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
        const year = selectedDate.getFullYear();

        const newCustomer = {
            "name": customerName,
            "email": customerEmail,
            "birthDate": day + '/' + month + '/' + year,
        }

        createCustomer(newCustomer);
        setCustomerReady(true);
    }

    if (customerReady)
        return <Redirect to="/pedidos"/>
    else return (
        <div className="container">
            <h1>Cadastrar Cliente</h1> 

            <Form>
                <Form.Group>
                    <Form.Label> <h2>Nome:</h2> </Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> <h2>E-mail:</h2> </Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label> <h2>Data de Nascimento:</h2> </Form.Label>
                    <DateInput
                        value={selectedDate}
                        dateFormat="dd/MM/yyyy"
                        disabled={false}
                        locale="pt-br"
                        onChange={(e) => setBirthDate(e)}
                    />
                </Form.Group>
            </Form>

            <button onClick={()=>handleSubmit()}> 
                Cadastar Cliente!
            </button>
        </div>
    );
};

export default CreateCustomer;
