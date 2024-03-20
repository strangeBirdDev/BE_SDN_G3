import express from 'express';
import { productController}  from '../controllers/index.js';

// Khai báo đối tượng router
const productRouter = express.Router();

productRouter.get('/', productController.getProductsByPageAndCategory );
productRouter.get('/find/:id', productController.findProductByProductId );
productRouter.get('/subProduct/:id', productController.findSubProductBySubProductId);
productRouter.get('/subProduct', productController.findSubProductByStorage);
productRouter.get('/subPro', productController.findSubProductByStorageAndColor);
productRouter.get('/setCart', productController.setCartProductsFromCookie);
productRouter.get('/cart', productController.getCartProductsFromCookie);
productRouter.delete('/cart', productController.deleteProductsFromCookie);


export default productRouter;
