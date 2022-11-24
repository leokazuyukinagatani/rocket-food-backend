import { Router } from "express";
import { ProductsController } from '../controllers/ProductsController'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { can } from "../middlewares/permissions";

const productsRoutes = Router()
const productsController = new ProductsController()


productsRoutes.use(ensureAuthenticated)

productsRoutes.post('/', can(["create_product"]), productsController.create)
productsRoutes.delete('/:id', productsController.delete)
productsRoutes.put('/', productsController.update)
productsRoutes.get('/', productsController.index)
productsRoutes.get('/:id', productsController.show)



export {
  productsRoutes
}