const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// JSON data
const materials = require('./data/db_materials.json') 
const recipes = require('./data/db_recipes.json') 
const recipes_materials = require('./data/db_recipes_materials.json') 
const orders = require('./data/db_orders.json') 

const db_all = {...materials, ...recipes, ...recipes_materials, ...orders}
const router = jsonServer.router(db_all)

const port = process.env.PORT || 8000

server.use(middlewares)
server.use(router)
server.listen(port, () => {
  console.log(`JSON Server is running in ${port}`)
})