import { Router } from 'express';
import {
    fetchAllStores, fetchStoreById, fetchStoreOrdersById,
    addNewStore, fetchStoreProductsById, addStoreProducts, updateStore,
    fetchStoreOrderProductsById
    // updateStoreProductById,,deleteStore
} from '../controllers/stores.controller';
const router = Router();

router.route('/addnewstore')
    .post(addNewStore);

router.route('/addstoreproducts')
    .post(addStoreProducts);

router.route('/storeinfo')
    .post(fetchAllStores);

router.route('/storeinfo/storeproducts')
    .post(fetchStoreProductsById)

router.route('/storeinfo/storeorders')
    .post(fetchStoreOrdersById)

router.route('/storeinfo/storeorderproducts/:orderId')
    .get(fetchStoreOrderProductsById)

// router.route('/storeinfo/storeproducts/:storeProductMappingId')
//     .get(fetchStoreProductById)
//     .put(updateStoreProductById)
// .delete(deleteStoreProductById);

router.route('/storeinfo/:storeId')
    .get(fetchStoreById)
    .put(updateStore)
// .delete(deleteStore);

// router.route('/:page_number/:page_size')
//     .get(fetchAllStores);

export default router;