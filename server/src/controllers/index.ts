import { mainService, productService, userGlobalActionService } from "../services";
import { MainController } from "./main.controller";
import { ProductController } from "./product.controller";
import { UserGlobalActionController } from "./userGlobalAction.contrller";

export const mainController = new MainController(mainService)
export const productController = new ProductController(productService)
export const userGlobalAction = new UserGlobalActionController(userGlobalActionService)