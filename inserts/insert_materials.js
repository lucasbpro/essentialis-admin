// constants 
//const URL_API = "http://localhost:5000";
const URL_API = 'https://essentialis-api-main.herokuapp.com'; 
const URL_MATERIALS = `${URL_API}/raw_materials`;

// import axios
const axios = require('axios');

// JSON data
const materialsJSON = require('../data/db_materials.json');

// Array
const materialsData = Object.values(materialsJSON)[0];

k = parseInt(process.argv[2]) || 0;
newMaterial = materialsData[k];
axios.post(`${URL_MATERIALS}`, newMaterial).then(resp => console.log(resp.data)).catch(error => console.log(error));

//materialsData.filter( material => parseInt(material.id, 10)>0 & parseInt(material.id, 10)<=100 )
// console.log(filteredMaterialsData)
/*
filteredMaterialsData.map( (material) => {
    const newMaterial = { 
        "description"   : material.description,
        "package_price" : material.package_price,
        "package_amt"   : material.package_amt,
        "unit_material" : material.unit_material,
        "stock_amt"     : material.stock_amt
    };

    axios.post(`${URL_MATERIALS}`, newMaterial).then(resp => console.log(resp.data)).catch(error => console.log(error));
});
*/
