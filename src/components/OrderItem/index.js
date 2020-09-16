import React from 'react';
import {Link} from 'react-router-dom';

import {TableItem} from './styles'

function OrderItem({index, orderId, customerName, orderDescription, orderDate, orderStatus, paymentStatus}){

    return(orderDescription === undefined? null :
        <TableItem key={index}>
            <td> 
                <Link to={`/pedido/${orderId}`}>{orderDescription}</Link>
            </td>
            <td>{orderDate}</td>
            <td>{customerName}</td>
            <td>{orderStatus}</td>
        </TableItem>
    );
}

export default OrderItem;