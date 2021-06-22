// constants 
const URL_API = 'https://essentialis-api-main.herokuapp.com'; 
const URL_RECIPES = `${URL_API}/recipes`;

// import axios
const axios = require('axios');

// JSON data
const recipesJSON = require('../data/db_recipes.json');

// Array
const recipesData = Object.values(recipesJSON);
k = parseInt(process.argv[2]) || 0;
newRecipe = recipesData[k];
axios.post(`${URL_RECIPES}`, newRecipe).then(resp => console.log(resp.data)).catch(error => console.log(error));

