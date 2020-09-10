import React, {useState, useEffect} from 'react';

//import Loading from '../../components/Loading';
import OrderFilter from '../../components/OrderFilter'
import OrderTable  from '../../containers/OrderTable';
import {filterOrdersByStatus, sortOrdersByDate} from '../../utils/filters'
import {getAllOrders} from '../../services';

const Orders = () => {

  const [orderList, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isFilterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    getAllOrders().then(out => sortOrdersByDate(out)).then(out=>setOrders(out));
  }, [])

  const handleFilter = (event) => {
      setFilteredOrders(filterOrdersByStatus(orderList, event.target.value))
      setFilterApplied(true)
  }

  return (
    <div className="container">
        <OrderFilter handleFilter={handleFilter}/>
        {(isFilterApplied && filteredOrders.length===0) && <h3> O filtro não retornou resultados </h3>}
        {isFilterApplied && <OrderTable ordersList={filteredOrders}/>}
    </div>
  );
};

export default Orders;
