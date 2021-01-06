import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useParams, Link, Redirect} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ConfirmDialog from '../../components/ConfirmDialog';

import {getOrderById, 
        getRecipeById,
        getCustomerById, 
        updateOrder,
        deleteOrder   } from '../../services';

import {TO_MANUFACTURE,
        READY_FOR_DELIVERY,
        PENDING_PAYMENT,
        PAYMENT_COMPLETE,
        MANUFACTURE_ONGOING,
        DELIVERED     } from '../../constants';

const OrderDetails = () => {

  const userLogged = useSelector(state => state.isUserLogged);

  const {orderId} = useParams();
  const [productInfo, setProduct] = useState([]);
  const [orderInfo, setOrder] = useState([]);
  const [customerInfo, setCustomer] = useState([]);
  const [loading, setLoaded] = useState(true);

  const [dialog, setDialog] = useState(false);
  //const [confirm, setConfirm] = useState(false);
  //const [message, setMessage] = useState("");

  useEffect(() => {
    getOrderById(orderId).then(resposta => setOrder(resposta));
  }, [orderId]); 

  useEffect(() => {
    if(orderInfo.product_id!== undefined){
      getRecipeById(orderInfo.product_id).then(resposta => setProduct(resposta));
      getCustomerById(orderInfo.customer_id).then(resposta => setCustomer(resposta));
      setLoaded(false);
    }
  }, [orderInfo]);  

  const onConfirmDialog = () => {
    console.log("confirmou")
    setDialog(false);
  }

  const handleChangeStatus = (orderInfo, currentStatus) => {
    let newOrder = orderInfo;
    
    switch(currentStatus){
        case(TO_MANUFACTURE):
            newOrder.status_fabrication = MANUFACTURE_ONGOING; 
            break;
        case(MANUFACTURE_ONGOING):
            newOrder.status_fabrication = READY_FOR_DELIVERY;
            break;
        case(READY_FOR_DELIVERY):
            newOrder.status_fabrication = DELIVERED;
            break;
        case(PENDING_PAYMENT):
            newOrder.status_payment = PAYMENT_COMPLETE;
            break;
        default:
            break;
    }
  
    //setMessage("Tem certeza que deseja classificar esse produto como ENTREGUE?");
    //setDialog(true);
    updateOrder(newOrder);
  }

  const handleDelete = (orderId) => {
    deleteOrder(orderId);
  }

  const statusChangeButton = (orderStatus) => {
    let statusChangeButton = undefined; 
    if(orderStatus!==DELIVERED)
        statusChangeButton = <Link to={`/pedido/${orderInfo.id}`}> 
                                  <button onClick={(e)=> handleChangeStatus(orderInfo, orderStatus)}> 
                                      {orderStatus===TO_MANUFACTURE? "FABRICAR" :
                                          (orderStatus===MANUFACTURE_ONGOING? "PRONTO" : "ENTREGUE")
                                      }
                                  </button>
                              </Link>;
    return statusChangeButton;
  }

  if(!userLogged)
    return <Redirect to='/login'/>
  else if(loading)
    return <h2>Carregando...</h2>;
  else return (
    <div className="container">

      <h1>Detalhes do Pedido</h1>

      <div className="section" >
        <Container fluid="true">
            <Row>
                <Col sm={5}> <h2>Produto:</h2> </Col>
                <Col sm={7}> <h3>{productInfo.description}</h3> </Col>
            </Row>
            <Row>
                <Col sm={5}> <h2>Data do Pedido:</h2> </Col>
                <Col sm={7}> <h3>{orderInfo.order_date} </h3> </Col>
            </Row>
            <Row>
                <Col sm={5}> <h2>Cliente:</h2> </Col>
                <Col sm={7}> <h3>{customerInfo.name}</h3> </Col>
            </Row>      
            <Row>
                <Col sm={5}> <h2>Status do Produto:</h2> </Col>
                <Col sm={7}> <h3>{orderInfo.status_fabrication}</h3> </Col>
            </Row>     
            <Row>
                <Col sm={5}> <h2>Status do Pagamento:</h2> </Col>
                <Col sm={7}> <h3>{orderInfo.status_payment}</h3> </Col>
            </Row>   
            <Row>
                <Col sm={5}> <h2>Valor:</h2> </Col>
                <Col sm={7}> <h3>{`R$ ${orderInfo.order_total}`}</h3> </Col>
            </Row>
            <Row>
                <Col sm={5}> <h2>Observações:</h2> </Col>
                <Col sm={7}> <h3>{orderInfo.notes} </h3> </Col>
            </Row>
        </Container>
      </div>

      <div className="section" >
        <Container fluid="true">
          <Row>
              <Col> 
                {statusChangeButton(orderInfo.status_fabrication)}
              </Col>
              <Col> 
                {orderInfo.status_payment===PENDING_PAYMENT? 
                    <Link to={`/pedido/${orderInfo.id}`}> 
                        <button onClick={()=>handleChangeStatus(orderInfo,PENDING_PAYMENT)}> 
                            PAGO 
                        </button>
                    </Link>
                    : null 
                }
              </Col>
              <Col> 
                {orderInfo.status_fabrication!==DELIVERED? 
                    <Link to="/pedidos"> 
                        <button onClick={()=>handleDelete(orderInfo.id)}
                                className="button-red"> 
                          DELETAR
                        </button>
                    </Link>
                    :
                    null
                }
              </Col>
            </Row>
        </Container>
      </div>
        
      { dialog? <ConfirmDialog
                   // message={message}
                    onConfirm={()=> onConfirmDialog}/>
              : null}
    </div>
  );
};

export default OrderDetails;
