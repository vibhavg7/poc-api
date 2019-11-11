"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.Router();
router.route('/subcategories/:sub_category_id')
    .get(category_controller_1.getSubCategoryData);
router.route('/storesubcategories')
    .post(category_controller_1.postStoreSubCategories)
    .delete(category_controller_1.deleteStoreSubCategory)
    .put(category_controller_1.updateStoreSubCategory);
router.route('/storesubcategories/:store_category_id')
    .post(category_controller_1.getStoreSubCategories);
router.route('/storecategories')
    .post(category_controller_1.postStoreCategories)
    .delete(category_controller_1.deleteStoreCategory)
    .put(category_controller_1.updateStoreCategory);
router.route('/storecategories/:category_id')
    // .get(getStoreCategories)
    .post(category_controller_1.getStoreCategories);
router.route('/')
    .get(category_controller_1.getCategoryInfo);
// .post(createPosts);
// router.route('/:postId')
//     .get(getPost)
//     .put(updatePost)
//     .delete(deletePost);
// .post(createPosts);
exports.default = router;
