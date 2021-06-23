import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

//import Loading from '../../components/Loading';
import Filter from '../../components/Filter'
import OrderTable  from '../../containers/OrderTable';
import {filterOrdersByText, sortOrdersByDate} from '../../utils/filters'
import { useSelector } from 'react-redux';

const Orders = () => {

  const userLogged = useSelector(state => state.isUserLogged);
  const productList = useSelector(state => state.recipeList);
  const customerList = useSelector(state => state.customerList);
  const orderList = useSelector(state => state.orderList);

  const [createPressed, setCreatePressed] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);

  const orderListComplete = sortOrdersByDate(orderList.map(order => {
      const product = productList.find(item => item.id === order.product_id);
      const customer = customerList.find(item => item.id === order.customer_id);
      return {...order, 
              "productDescription": product? product.description : "",
              "customerName" : customer? customer.name: ""
            }
  }));

  const [filteredOrders, setFilteredOrders] = useState(orderListComplete);
      
  const handleFilter = (event) => {
      setFilteredOrders(filterOrdersByText(orderListComplete, event.target.value))
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

        <OrderTable ordersList={filteredOrders}/>

        {(isFilterApplied && filteredOrders.length===0) &&
         <h3 className="filter-no-results"> O filtro não retornou resultados. </h3>}
      </div>
    );
};

export default Orders;
