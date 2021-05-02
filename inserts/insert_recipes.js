// constants 
//const URL_API = "http://localhost:5000";
const URL_API = 'https://essentialis-api-main.herokuapp.com'; 
const URL_RECIPES = `${URL_API}/recipes`;

// import axios
const axios = require('axios');

// JSON data
const recipesJSON = require('../data/db_recipes.json');
const recipesMaterialsMap = require('../data/db_recipes_materials.json');

// Arrays
const recipesData = Object.values(recipesJSON)[0];
const mapRecipes = Object.values(recipesMaterialsMap)[0];

//
k = parseInt(process.argv[2]) || 0
console.log(k)

let materialsIds = [];
recipe = recipesData[k];
const item = mapRecipes.filter( item => item.recipe_id === recipe.id);
if(item)
    materialsIds = item.map(mapItem => parseInt(mapItem.material_id, 10));

const newRecipe = { "description" : recipe.description,
                    "materials"   : materialsIds
};

axios.post(`${URL_RECIPES}`, newRecipe).then(resp => console.log(resp.data)).catch(error => console.log(error));

/*
recipesData.map( (recipe) => {
    let materialsIds = [];
    const materials = mapRecipes.filter( item => item.recipe_id === recipe.id);

    if(materials)
        materialsIds = materials.map(material => parseInt(material.id, 10));

    const newRecipe = { "description" : recipe.description,
                        "materials"   : materialsIds
    };

    axios.post(`${URL_RECIPES}`, newRecipe).then(resp => console.log(resp.data)).catch(error => console.log(error));
});
*/



