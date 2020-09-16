import React from 'react';
import OrderItem from '../../components/OrderItem';
import Table from 'react-bootstrap/Table'

const OrderTable = ({ordersList}) => { 

   if (ordersList.length===0)
      return null;
   else return (
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th> Produto </th>
                     <th> Data do pedido </th>
                     <th> Cliente </th>
                     <th> Status </th>
                  </tr>
               </thead>

               <tbody>
                  {ordersList && ordersList.map((order, index)  => {

                     const customerName = "Fulano";

                     return <OrderItem key={index} 
                                       index={index}
                                       productId={order.product_id} 
                                       orderId={order.id} 
                                       customerName={customerName}
                                       orderDescription={order.productDescription} 
                                       orderDate={order.order_date}
                                       orderStatus={order.status_fabrication} 
                                       paymentStatus={order.status_payment} />
                  })} 
               </tbody>
            </Table>
		);
}

export default OrderTable;