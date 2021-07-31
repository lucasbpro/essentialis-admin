import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Filter from '../../components/Filter'
import OrderTable  from '../../containers/OrderTable';
import Loading from '../../components/Loading';
import {filterOrdersByText, sortOrdersByDate} from '../../utils/filters'
import { setRecipeList, setCustomerList, setOrderList } from '../../reducer';
import { getAllRecipes, getAllCustomers, getAllOrders } from '../../services';

const Orders = () => {

    const userLogged = useSelector(state => state.isUserLogged);
    let productList = useSelector(state => state.recipeList);
    let customerList = useSelector(state => state.customerList);
    let orderList = useSelector(state => state.orderList);
    const dispatch = useDispatch();

    const [createPressed, setCreatePressed] = useState(false);
    const [isFilterApplied, setFilterApplied] = useState(false);
    const [ordersComplete, setOrdersComplete] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [ordersReady, setOrdersReady] = useState(false);

    // if recipes list in global state is empty, fetch the API for recipes data
    if(productList.length=== 0) {
        getAllRecipes().then(resposta => {
            productList = resposta;
            dispatch(setRecipeList(resposta));
        });
    }

    // if customers list in global state is empty, fetch the API for customers data
    if(customerList.length=== 0) {
        getAllCustomers().then(resposta => {
            customerList = resposta;
            dispatch(setCustomerList(resposta));
        });
    }

    // if orders list in global state is empty, fetch the API for orders data
    if(orderList.length=== 0) {
        getAllOrders().then(resposta => {
            orderList = resposta;
            dispatch(setOrderList(resposta));
        });
    }

    useEffect(() => {
        const orderListComplete = sortOrdersByDate(orderList.map(order => {
            const product = productList.find(item => item.id === order.product_id);
            const customer = customerList.find(item => item.id === order.customer_id);
            return {...order, 
                    "productDescription": product? product.description : "",
                    "customerName" : customer? customer.name: ""
                }
            }));
        
        setOrdersComplete(orderListComplete);
        setFilteredOrders(orderListComplete);
        setOrdersReady(true);
    }, [orderList, productList, customerList]);

        
    const handleFilter = (event) => {
        setFilteredOrders(filterOrdersByText(ordersComplete, event.target.value))
        setFilterApplied(true);
    }

    if(!userLogged)
        return <Redirect to='/login'/>
    else if(createPressed)
        return <Redirect to='/criarPedido'/>
    else return ( 
        <div className="container">

            <h1> Pedidos </h1>

            <Filter handleFilter={handleFilter} placeholder="Filtrar por produto, cliente ou status"/>

            <button  className="button-new-item" onClick={()=>setCreatePressed(true)}>	
                Novo Pedido 
            </button>

            {ordersReady? <OrderTable ordersList={filteredOrders}/> : <Loading/>}

            {(isFilterApplied && filteredOrders.length===0) && 
                <h3 className="filter-no-results"> O filtro não retornou resultados. </h3>}
        </div>
        );
    };

export default Orders;
