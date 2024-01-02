const { Router } = require("express")
const productsRoutes = Router()

const ProductsController = require("../controllers/ProductsController")
const productsController = new ProductsController()

productsRoutes.post("/", productsController.create)

module.exports = productsRoutes