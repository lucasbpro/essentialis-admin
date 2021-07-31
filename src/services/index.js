

const env_type = getEnvType();
const URL_API = env_type==="production"? "https://essentialis-main.herokuapp.com" : 
                    env_type==="develop"? "https://essentialis-api-main.herokuapp.com" : "http://localhost:5000";
            
const URL_AUTH = `${URL_API}/auth`;
const URL_RECIPES = `${URL_API}/recipes`;
const URL_MATERIALS = `${URL_API}/raw_materials`;
const URL_ORDERS = `${URL_API}/orders`;
const URL_CUSTOMERS = `${URL_API}/customers`;

const axios = require('axios');


async function getEnvType() {
  return process.env.ENVTYPE;
}

async function get(URL){
  return fetch(URL).then(async (response) => {
      if (response.ok)
        return await response.json();
      throw new Error(`Error when communicating with server at ${URL}`);
    });
}

/************************* AUTHENTICAION *******************************/

async function login(userInfo){
  return axios.post(`${URL_AUTH}`,userInfo).then(resposta => resposta); 
}

/****************************  RECIPES *********************************/ 

async function getAllRecipes(){
  return get(URL_RECIPES);
}

async function getRecipeById(recipeId){
  return get(`${URL_RECIPES}/${recipeId}`);
}

async function createRecipe(newRecipe){
  return axios.post(`${URL_RECIPES}`,newRecipe).then(resp => resp); 
}

async function updateRecipe(recipeInfo){
  const recipeId = recipeInfo.id;
  return axios.put(`${URL_RECIPES}/${recipeId}`, {"materials" : recipeInfo.materials}); 
}

async function deleteRecipe(recipeId){
  return axios.delete(`${URL_RECIPES}/${recipeId}`).then(resposta => resposta); 
}

/****************************  MATERIALS *********************************/ 

async function getAllMaterials(){
  return get(URL_MATERIALS);
}

async function getMaterialById(materialId){
  return get(`${URL_MATERIALS}/${materialId}`);
}

async function getMaterialsByIds(materialIds){
  let materialsInfo = [];

  if( materialIds &&  materialIds.length>0)
    for(let i=1; i<materialIds.length; i++)
      materialsInfo.push(await getMaterialById(materialIds[i]));
 
  return materialsInfo; 
}

async function createMaterial(newMaterial){
  return axios.post(`${URL_MATERIALS}`,newMaterial).then(r => r); 
}

async function deleteMaterial(materialId){
  return axios.delete(`${URL_MATERIALS}/${materialId}`).then(r => r); 
}

/****************************  ORDERS *********************************/ 

async function getAllOrders(){
  return get(URL_ORDERS);
}

async function getOrderById(orderId){
  return get(`${URL_ORDERS}/${orderId}`);
}

async function updateOrder(orderInfo){
  const orderId = orderInfo.id;
  const removeKey = (key, {[key]: _, ...rest}) => rest;
  const newOrder = removeKey('id',orderInfo);
  console.log(newOrder);
  return axios.put(`${URL_ORDERS}/${orderId}`, {...newOrder}).then(resposta => resposta); 
}

async function createOrder(newOrder){
  return axios.post(`${URL_ORDERS}`,newOrder).then(resposta => resposta); 
}

async function deleteOrder(orderId){
  return axios.delete(`${URL_ORDERS}/${orderId}`).then(resposta => resposta); 
}

/****************************  CUSTOMERS *********************************/ 

async function getAllCustomers(){
  return get(URL_CUSTOMERS);
}

async function getCustomerById(customerId){
  return get(`${URL_CUSTOMERS}/${customerId}`);
}

async function createCustomer(newCustomer){
  return axios.post(`${URL_CUSTOMERS}`,newCustomer).then(resposta => resposta); 
}

async function deleteCustomer(customerId){
  return axios.delete(`${URL_CUSTOMERS}/${customerId}`).then(resposta => resposta); 
}

/****************************  EXPORT CLAUSE *********************************/ 

export {
    getEnvType,
    login,
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getAllMaterials,
    getMaterialById,
    getMaterialsByIds,
    createMaterial,
    deleteMaterial,
    getAllOrders,
    getOrderById,
    updateOrder,
    createOrder,
    deleteOrder,
    getAllCustomers,
    getCustomerById,
    createCustomer,
    deleteCustomer
}