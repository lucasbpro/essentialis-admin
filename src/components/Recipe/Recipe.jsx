import React from 'react';
//import '../Recipe.scss';

const Recipe = ({recipe}) => {

    return(
        <div data-testid="recipe" className="recipe">
            <span className="recipe_name"> {recipe.name} </span>

            <span className="recipe_materials"> {recipe.materials} </span>

            <span className="recipe_createdOn">{recipe.creation_date}</span>

            <span className="recipe_updatedOn">{recipe.last_update_date}</span>
        </div>
    );
}

export default Recipe;
