import React from 'react';

import {TableItem} from './styles'

function OrderItem({index, orderDescription, orderDate, orderStatus, paymentStatus }){

    return(orderDescription === undefined? null :
        <TableItem key={index}>
            <td>{orderDescription}</td>
            <td>{orderDate}</td>
            <td>{orderStatus}</td>
            <td>{paymentStatus}</td>
        </TableItem>
    );
}

export default OrderItem;