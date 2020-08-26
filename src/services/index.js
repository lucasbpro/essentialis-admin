
//const URL_API = "https://essentialis-server.herokuapp.com";
const URL_API = "http://localhost:8000";

const URL_RECIPES = `${URL_API}/recipes`;
const URL_MATERIALS = `${URL_API}/raw_materials`;
const URL_RECIPE_MATERIALS = `${URL_API}/recipes_materials`;

async function get(URL){
  return fetch(URL).then(async (response) => {
      if (response.ok)
        return await response.json();
      throw new Error(`Error when communicating with server at ${URL}`);
    });
}

async function getAllRecipes(){
  return get(URL_RECIPES);
}

async function getAllMaterials(){
  return get(URL_MATERIALS);
}

async function getRecipesMaterialsMap(){
  return get(URL_RECIPE_MATERIALS);
}

export {
    getAllRecipes,
    getAllMaterials,
    getRecipesMaterialsMap
}