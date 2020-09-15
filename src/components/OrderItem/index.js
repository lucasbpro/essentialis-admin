import React from 'react';
import {Link} from 'react-router-dom';

import {TableItem} from './styles'

function OrderItem({index, orderId, productId, orderDescription, orderDate, orderStatus, paymentStatus}){

    return(orderDescription === undefined? null :
        <TableItem key={index}>
            <td> 
                <Link to={`/pedido/${orderId}/${productId}`}>{orderDescription}</Link>
            </td>
            <td>{orderDate}</td>
            <td>{orderStatus}</td>
            <td>{paymentStatus}</td>
        </TableItem>
    );
}

export default OrderItem;