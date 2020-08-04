import React from "react";
import Recipe from '../../components/Recipe';


const Recipes = ({recipeList}) => { 

		return (
			<div className="recipes">
        <div className="recipes-header">
           <span className="recipes-header-name">         Nome           </span>
           <span className="recipes-header-materiais">    Materiais      </span>
           <span className="recipes-header-create-date">  Criada em      </span>
           <span className="recipes-header-last-update">  Modificada em  </span>
        </div>

        {recipeList ? recipeList.map((recipe, index)  => {
				    return <Recipe key={index} data={recipe}/>
            }) 
            : 
            null
        }
			</div>
		);
}

export default Recipes;