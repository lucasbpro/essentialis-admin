import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';
import OrderFilter from '../../components/OrderFilter'
import OrderTable  from '../../containers/OrderTable';
import {filterOrdersByText, sortOrdersByDate} from '../../utils/filters'
import {getAllOrders, getAllRecipes, getAllCustomers} from '../../services';

const Orders = () => {

  const [orderList, setOrderList] = useState([]);
  const [orderListComplete, setOrderListComplete] = useState([]);

  const [productList, setProductList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [fetched, setFetched] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    getAllOrders().then(resposta =>setOrderList(resposta));
  },[]);

  useEffect(() => {
    getAllRecipes().then(resposta =>setProductList(resposta));
  },[]);

  useEffect(() => {
    getAllCustomers().then(resposta =>setCustomerList(resposta));
  },[]);

  useEffect(() => {
    setOrderListComplete(sortOrdersByDate(orderList.map(order => {
        const product = productList.find(item => item.id === order.product_id);
        const customer = customerList.find(item => item.id === order.customer_id);
        return {...order, 
                "productDescription": product? product.description : "",
                "customerName" : customer? customer.name: ""
              }
    })))
    setFetched(true);
  },[orderList, productList, customerList]);

  useEffect(() => {
    setFilteredOrders(orderListComplete);
  },[orderListComplete]);

  const handleFilter = (event) => {
      console.log(event.target.value)
      setFilteredOrders(filterOrdersByText(orderListComplete, event.target.value))
      setFilterApplied(true);
  }

     
  if (fetched)
    return (
      <div className="container">
        <OrderFilter handleFilter={handleFilter}/>
        <OrderTable ordersList={filteredOrders}/>
        {(isFilterApplied && filteredOrders.length===0) && <h3> O filtro não retornou resultados </h3>}
      </div>
    );
  else 
    return <h1> Carregando... </h1>;

};

export default Orders;
