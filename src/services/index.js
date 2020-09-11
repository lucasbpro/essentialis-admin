
const URL_API = "https://essentialis-server.herokuapp.com";
//const URL_API = "http://localhost:8000";

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

async function getRecipeById(recipeId){
  return get(`${URL_RECIPES}/${recipeId}`);
}

async function getAllMaterials(){
  return get(URL_MATERIALS);
}

async function getMaterialById(materialId){
  return get(`${URL_MATERIALS}/${materialId}`);
}

async function getMaterialsByIds(materialIds){
  let materialsInfo = [];

  if(materialIds.length>0)
    for(let i=1; i<materialIds.length; i++)
      materialsInfo.push(await getMaterialById(materialIds[i]));
 
  return materialsInfo; 
}

async function getRecipesMaterialsMap(){
  return get(URL_RECIPE_MATERIALS);
}

export {
    getAllRecipes,
    getRecipeById,
    getAllMaterials,
    getMaterialById,
    getMaterialsByIds,
    getRecipesMaterialsMap
}