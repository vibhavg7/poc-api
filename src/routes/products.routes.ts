import { Router } from 'express';
import { getProducts, addProduct, getProduct, updateProduct, deleteProduct, 
        getcategoryProductInfo,searchProductByName } from '../controllers/products.controller';
const router = Router();

router.route('/')
    .post(addProduct);

router.route('/category/:categoryId')
    .get(getcategoryProductInfo)


router.route('/productsearch/:productName')
    .get(searchProductByName);
    // .put(updateProduct)
    // .delete(deleteProduct);

router.route('/:productId')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/fetchProducts')
    .post(getProducts);

export default router;