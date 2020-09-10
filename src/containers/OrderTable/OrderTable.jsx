import React, {useEffect} from 'react';
import OrderItem from '../../components/OrderItem';
import Table from 'react-bootstrap/Table'

import {getRecipeById} from '../../services'

const OrderTable = ({ordersList}) => { 

      /*
      useEffect(() => ordersList.map(order => {
            const orderDescription = getRecipeById(order.product_id).then(item => item.description);
            return null; //{...order, "productDescription": orderDescription};
      }));
      */ 
     
      if (ordersList.length===0)
         return null;
      else return (
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th> Produto </th>
                     <th> Data do pedido </th>
                     <th> Status Fabricação </th>
                     <th> Status Pagamento </th>
                  </tr>
               </thead>

               <tbody>
                  {ordersList && ordersList.map((order, index)  => {

                     return <OrderItem key={index} 
                                       index={index}
                                       orderDescription={"teste"} 
                                       orderDate={order.order_date}
                                       orderStatus={order.status_fabrication} 
                                       paymentStatus={order.status_payment} />
                  })} 
               </tbody>
            </Table>
		);
}

export default OrderTable;