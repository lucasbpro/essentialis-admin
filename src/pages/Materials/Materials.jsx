import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Filter from '../../components/Filter';
import MaterialsTable from '../../containers/MaterialsTable';
import Loading from '../../components/Loading';
import {filterListByText} from '../../utils/filters';
import { setMaterialsList } from '../../reducer';
import { getAllMaterials } from '../../services';

const Materials = () => {

  const userLogged = useSelector(state => state.isUserLogged);
  let allMaterials = useSelector(state => state.materialsList);
  const dispatch = useDispatch();

  const [createPressed, setCreatePressed] = useState(false);
  const [isFilterApplied, setFilterApplied] = useState(false);
  const [filteredMaterials, setFilteredMaterials] = useState(allMaterials);

  if(allMaterials.length=== 0) {
    getAllMaterials().then(resposta => {
        allMaterials = resposta;
        dispatch(setMaterialsList(resposta));
    });
  }

  useEffect(() => {
    setFilteredMaterials(allMaterials);
  }, [allMaterials])

  const handleFilter = (event) => {
      setFilteredMaterials(filterListByText(allMaterials, event.target.value));
      setFilterApplied(true);
  }

  if(!userLogged)
      return <Redirect to='/login'/>
  else if(createPressed)
      return <Redirect to='/criarMaterial'/>
  else return (
    <div className="container">

        <h1> Materiais </h1>

        <Filter handleFilter={handleFilter} placeholder="Filtrar por nome do material"/>

        <button  className="button-new-item" onClick={()=>setCreatePressed(true)}>	
            Novo Material 
        </button>

        {allMaterials.length===0 ? <Loading/> : <MaterialsTable materialsList={filteredMaterials}/>}

        {(isFilterApplied && filteredMaterials.length===0) && 
        <h3 className="filter-no-results"> O filtro não retornou resultados </h3>}

    </div>
  );
};

export default Materials;
