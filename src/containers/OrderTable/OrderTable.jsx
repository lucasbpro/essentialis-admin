import React, {useEffect, useState} from 'react';
import OrderItem from '../../components/OrderItem';
import Table from 'react-bootstrap/Table'

import {getRecipeById} from '../../services'

const OrderTable = ({ordersList}) => { 

      const [orderListComplete, setOrderList] = useState([]);
      const [loading, setLoading] = useState(true);

      const addProductDescription = (ordersList) => {
         return ordersList.map(order => {
            const orderDescription = getRecipeById(order.product_id).then(item => item.description);
            return orderDescription.then(resposta => {
               return {...order, "productDescription": resposta}
            });
         })

         /*
         let orderListComplete = [];

         if(ordersList.length>0)
           for(let i=1; i<ordersList.length; i++){
               orderListComplete.push({...ordersList[i], 
                                       "productDescription": getRecipeById(ordersList[i].product_id)});
           }

         return orderListComplete; 
         */
      }

      useEffect(() => {
         setOrderList(addProductDescription(ordersList))
      },[ordersList]);

      useEffect(() => {
         console.log(orderListComplete)
         setLoading(false);
      },[ordersList, orderListComplete]);

      if (orderListComplete.length===0 || loading)
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
                  {ordersList && orderListComplete.map((order, index)  => {

                     return <OrderItem key={index} 
                                       index={index}
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