import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';
import OrderFilter from '../../components/OrderFilter'
import OrderTable  from '../../containers/OrderTable';
import {filterOrdersByStatus, sortOrdersByDate} from '../../utils/filters'
import {getAllOrders, getAllRecipes} from '../../services';

const Orders = () => {

  const [orderList, setOrderList] = useState([]);
  const [orderListComplete, setOrderListComplete] = useState([]);

  const [productList, setProductList] = useState([]);
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
    setOrderListComplete(sortOrdersByDate(orderList.map(order => {
        const product = productList.find(item => item.id === order.product_id);
        return {...order, 
                "productDescription": product? product.description : ""}
    })))
    setFetched(true);
  },[orderList, productList]);

  const handleFilter = (event) => {
      setFilteredOrders(filterOrdersByStatus(orderListComplete, event.target.value))
      setFilterApplied(true);
  }

     
  if (fetched)
    return (
      <div className="container">
        <OrderFilter handleFilter={handleFilter}/>
        {(isFilterApplied && filteredOrders.length===0) && <h3> O filtro não retornou resultados </h3>}
        {isFilterApplied && <OrderTable ordersList={filteredOrders}/>}
      </div>
    );
  else 
    return <h1> Carregando... </h1>;

};

export default Orders;
