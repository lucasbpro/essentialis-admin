import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Filter from '../../components/Filter'
import MaterialsTable from '../../containers/MaterialsTable';
import {filterListByText} from '../../utils/filters'


const Materials = () => {

  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  const userLogged = useSelector(state => state.isUserLogged);
  const allMaterials = useSelector(state => state.materialsList);

  useEffect(() => {
    setFilteredMaterials(allMaterials);
  }, [allMaterials])

  const handleFilter = (event) => {
      setFilteredMaterials(filterListByText(allMaterials, event.target.value));
      setFilterApplied(true);
  }

  if(!userLogged)
      return <Redirect to='/login'/>
  else return (
    <div className="container">
        <h1> Materiais </h1>
        <Filter handleFilter={handleFilter} placeholder="Filtrar por nome do material"/>
        <MaterialsTable materialsList={filteredMaterials} />
        {(isFilterApplied && filteredMaterials.length===0) && <h3> O filtro não retornou resultados </h3>}
    </div>
  );
};

export default Materials;
