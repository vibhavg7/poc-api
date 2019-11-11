import { Router } from 'express';
import {
    getCategoryInfo, getStoreCategories, postStoreCategories,
    deleteStoreCategory, updateStoreCategory,getSubCategoryData,
    getStoreSubCategories, postStoreSubCategories, deleteStoreSubCategory, updateStoreSubCategory
} from '../controllers/category.controller';
const router = Router();


router.route('/subcategories/:sub_category_id')
    .get(getSubCategoryData);


router.route('/storesubcategories')
    .post(postStoreSubCategories)
    .delete(deleteStoreSubCategory)
    .put(updateStoreSubCategory);

router.route('/storesubcategories/:store_category_id')
    .post(getStoreSubCategories);

router.route('/storecategories')
    .post(postStoreCategories)
    .delete(deleteStoreCategory)
    .put(updateStoreCategory);

router.route('/storecategories/:category_id')
    // .get(getStoreCategories)
    .post(getStoreCategories);

router.route('/')
    .get(getCategoryInfo);
// .post(createPosts);

// router.route('/:postId')
//     .get(getPost)
//     .put(updatePost)
//     .delete(deletePost);
// .post(createPosts);
export default router;