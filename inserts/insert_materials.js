// constants 
const URL_API = 'https://essentialis-api-main.herokuapp.com'; 
const URL_MATERIALS = `${URL_API}/raw_materials`;

// import axios
const axios = require('axios');

// JSON data
const materialsJSON = require('../data/raw_materials.json');

// Array
const materialsData = Object.values(materialsJSON)[0];

const k = parseInt(process.argv[2]) || 0;
const newMaterial = materialsData[k];
axios.post(`${URL_MATERIALS}`, newMaterial).then(resp => console.log(resp.data)).catch(error => console.log(error));
