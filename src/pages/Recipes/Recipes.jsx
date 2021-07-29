import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux';

import Filter from '../../components/Filter'
import RecipesTable from '../../containers/RecipesTable';
import Loading from '../../components/Loading';
import {filterListByText} from '../../utils/filters';
import { setRecipeList, setMaterialsList } from '../../reducer';
import { getAllRecipes, getAllMaterials } from '../../services';

const Recipes = () => {

    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [isFilterApplied, setFilterApplied] = useState(false);
    const [createPressed, setCreatePressed] = useState(false);

    const userLogged = useSelector(state => state.isUserLogged);
    let recipeList = useSelector(state => state.recipeList);
    let materialsList = useSelector(state => state.materialsList);

    const dispatch = useDispatch();
    
    // if recipes list in global state is empty, fetch the API for recipes data
    if(recipeList.length=== 0) {
        getAllRecipes().then(resposta => {
            recipeList = resposta;
            dispatch(setRecipeList(resposta));
        });
    }

    // if materials list in global state is empty, fetch the API for materials data
    if(materialsList.length=== 0) {
        getAllMaterials().then(resposta => {
            materialsList = resposta;
            dispatch(setMaterialsList(resposta));
        });
    }

    // re-render page in case recipeList is updated
    useEffect(() => setFilteredRecipes(recipeList), [recipeList]);

    const handleFilter = (event) => {
        setFilteredRecipes(filterListByText(recipeList, event.target.value));
        setFilterApplied(true);
    };

    if( !userLogged )
        return <Redirect to='/login'/>
    else if(createPressed)
        return <Redirect to='/criarReceita'/>
    else return (
        <div className="container">
            <h1> Receitas </h1>

            <Filter handleFilter={handleFilter} placeholder="Filtrar por nome da receita"/>

            <button  className="button-new-item" onClick={()=>setCreatePressed(true)}>	
                Nova Receita 
            </button>

            { recipeList.length===0 || materialsList.length===0 ? <Loading/> :
                <RecipesTable recipesList={filteredRecipes} allMaterials={materialsList}/>
            }

            {(isFilterApplied && filteredRecipes.length===0) && 
            <h3 className="filter-no-results"> O filtro não retornou resultados </h3>}
        </div>
    );
    };

    export default Recipes;
