import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import {Redirect} from "react-router-dom";

import {getAllRecipes, getAllCustomers, createOrder} from '../../services';
//import Loading from '../../components/Loading


const CreateOrder = () => {

  const [recipeList, setRecipeList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [orderReady, setOrderReady] = useState(false);

  useEffect(() => {
    getAllRecipes().then(resposta => setRecipeList(resposta));
  },[]);

  useEffect(() => {
    getAllCustomers().then(resposta => setCustomerList(resposta));
  },[]);


  const handleSubmit = () => {
      const customer = document.getElementById("customer");
      const customerId = customer.options[customer.selectedIndex].value;

      const product = document.getElementById("product");
      const productId = product.options[product.selectedIndex].value;

      const notes = document.getElementById("notes").value;

      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const year = today.getFullYear();

      const newOrder = {
          "customer_id": customerId,
          "product_id": productId,
          "status_fabrication": "Fabricação a iniciar",
          "status_payment": "Pagamento pendente",  
          "order_date": day + '/' + month + '/' + year,
          "order_total": "7.49",
          "notes" : notes
      }

      createOrder(newOrder);
      setOrderReady(true);
  }

  if (orderReady)
      return <Redirect to="/pedidos"/>
  else return (
      <div className="container">
        <h1>Cadastrar Pedido </h1> 

        <Form>
          <Form.Group controlId="customer">
              <Form.Label> <h2>Selecione um cliente:</h2> </Form.Label>
              <Form.Control as="select">
                  {customerList.map((item, index) => {
                      return <option key={index} value={`${item.id}`}> {item.name} </option>
                    }
                  )}
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="product">
            <Form.Label> <h2>Selecione um produto:</h2> </Form.Label>
            <Form.Control as="select">
              {recipeList.map((item, index) => {
                  return <option key={index} value={`${item.id}`}> {item.description} </option>
                }
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="amount">
              <Form.Label> <h2>Quantidade:</h2> </Form.Label>
              <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </Form.Control>
          </Form.Group>

          <Form.Group controlId="notes">
            <Form.Label> <h2>Observações:</h2> </Form.Label>
            <Form.Control as="textarea" rows="3" />
          </Form.Group>
        </Form>

        <button onClick={()=>handleSubmit()}> 
            Criar Pedido!
        </button>
      </div>
    );
};

export default CreateOrder;
