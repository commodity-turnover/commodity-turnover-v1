import { mainService, productService } from "../services";
import { MainController } from "./main.controller";
import { ProductController } from "./product.controller";

export const mainController = new MainController(mainService)
export const productController = new ProductController(productService)