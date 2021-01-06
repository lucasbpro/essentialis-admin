//const URL_API = "https://essentialis-api-main.herokuapp.com"; // development API
//const URL_API = "http://localhost:8000"; // localhost API ()
const URL_API = "https://essentialis-server.herokuapp.com"; // mock API

const URL_AUTH = `${URL_API}/auth`;
const URL_RECIPES = `${URL_API}/recipes`;
const URL_MATERIALS = `${URL_API}/raw_materials`;
const URL_RECIPE_MATERIALS = `${URL_API}/recipes_materials`;
const URL_ORDERS = `${URL_API}/orders`;
const URL_CUSTOMERS = `${URL_API}/customers`;

const axios = require('axios');

async function get(URL){
  return fetch(URL).then(async (response) => {
      if (response.ok)
        return await response.json();
      throw new Error(`Error when communicating with server at ${URL}`);
    });
}

/************************* AUTHENTICAION *******************************/
async function login(username, password){
  const userInfo = {
              "username": username,
              "passord" : password
            };
  
  return axios.post(`${URL_AUTH}`, {...userInfo}).then(resposta => resposta); 
}

/****************************  RECIPES *********************************/ 

async function getAllRecipes(){
  return get(URL_RECIPES);
}

async function getRecipeById(recipeId){
  return get(`${URL_RECIPES}/${recipeId}`);
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

  if(materialIds.length>0)
    for(let i=1; i<materialIds.length; i++)
      materialsInfo.push(await getMaterialById(materialIds[i]));
 
  return materialsInfo; 
}

async function getRecipesMaterialsMap(){
  return get(URL_RECIPE_MATERIALS);
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

  const newOrder = {"product_id": orderInfo.product_id,
                    "customer_id": orderInfo.customer_id,
                    "order_total": orderInfo.order_total,
                    "status_fabrication": orderInfo.status_fabrication,
                    "status_payment": orderInfo.status_payment,         
                    "order_date": orderInfo.order_date,
                    "notes" : orderInfo.notes
                    };
  
  return axios.put(`${URL_ORDERS}/${orderId}`, {...newOrder}).then(resposta => resposta); 
}

async function deleteOrder(orderId){
  return axios.delete(`${URL_ORDERS}/${orderId}`).then(resposta => resposta); 
}

async function createOrder(newOrder){
  return axios.post(`${URL_ORDERS}`,newOrder).then(resposta => resposta); 
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



export {
    login,
    getAllRecipes,
    getRecipeById,
    getAllMaterials,
    getMaterialById,
    getMaterialsByIds,
    getRecipesMaterialsMap,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    createOrder,
    getAllCustomers,
    getCustomerById,
    createCustomer
}