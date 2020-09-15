import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//import Button from 'react-bootstrap/Button'
//import Loading from '../../components/Loading';

import {getOrderById, getRecipeById} from '../../services';

const OrderDetails = () => {

  const {orderId, productId} = useParams();
  const [productInfo, setProduct] = useState([]);
  const [orderInfo, setOrder] = useState([]);
  const [loading, setLoaded] = useState(true);

  useEffect(() => {
    getRecipeById(productId).then(resposta => setProduct(resposta))
    getOrderById(orderId).then(resposta => setOrder(resposta))
    setLoaded(false);
  }, [productId, orderId]); 

  if(loading)
    return <h2>Carregando...</h2>;
  else return (
    <div className="container">

        <h1>Detalhes do Pedido</h1>

        <Container fluid="true">
            <Row>
                <Col> <h2>Produto:</h2> </Col>
                <Col> <h3>{productInfo.description}</h3> </Col>
            </Row>
            <Row>
                <Col> <h2>Data do Pedido:</h2> </Col>
                <Col> <h3>{orderInfo.order_date} </h3> </Col>
            </Row>
            <Row>
                <Col> <h2>Cliente:</h2> </Col>
                <Col> <h3>Fulano</h3> </Col>
            </Row>           
            <Row>
                <Col> <h2>Status do Pagamento:</h2> </Col>
                <Col> <h3>{orderInfo.status_payment}</h3> </Col>
            </Row>   
            <Row>
                <Col> <h2>Status da Fabricação:</h2> </Col>
                <Col> <h3>{orderInfo.status_fabrication}</h3> </Col>
            </Row>
            <Row>
                <Col> <h2>Valor:</h2> </Col>
                <Col> <h3>{`R$ ${orderInfo.order_total}`}</h3> </Col>
            </Row>
      </Container>

      <Container fluid="true">
          <Row>
              <Col> 
                { orderInfo.status_fabrication==="A fabricar"? 
                <button> FABRICADO </button>
                :
                orderInfo.status_fabrication==="Pronto para entrega"?
                    <button> ENTREGUE </button> 
                    :
                    null
                }
              </Col>
              <Col> 
                {orderInfo.status_payment==="Pago"? <button> PAGO</button> : null }
              </Col>
            </Row>
      </Container>
    </div>
  );
};

export default OrderDetails;
