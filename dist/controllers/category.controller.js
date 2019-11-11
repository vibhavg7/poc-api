"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const _ = __importStar(require("lodash"));
// import { Customer } from '../interfaces/Product';
function getCategoryInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_CATEGORY_INFO()`;
        yield conn.query(sql, function (err, categories) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "Category list",
                    "products": categories[0]
                });
            }
        });
    });
}
exports.getCategoryInfo = getCategoryInfo;
function getStoreCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getStoreCategories');
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_STORE_CATEGORY_INFO(?,?)`;
        let category_id = +req.params.category_id;
        yield conn.query(sql, [category_id, req.body.filterBy], function (err, categories) {
            let arr = [];
            let arr1 = [];
            if (category_id == 0) {
                let categories_data = categories[0];
                let store_with_sub_categories = _.filter(categories_data, (data) => data['category_id'] != null);
                let store_with_sub_categories_grouped = _.groupBy(store_with_sub_categories, function (cat) {
                    return cat.store_category_name;
                });
                let category_array = Object.keys(store_with_sub_categories_grouped);
                category_array.forEach(element => {
                    let obj = {};
                    obj['store_category_id'] = store_with_sub_categories_grouped[element][0]['store_category_id'];
                    obj['store_category_ranking'] = store_with_sub_categories_grouped[element][0]['store_category_ranking'];
                    obj['store_image_url'] = store_with_sub_categories_grouped[element][0]['image_url'];
                    obj['status'] = store_with_sub_categories_grouped[element][0]['status'];
                    obj['last_updated'] = store_with_sub_categories_grouped[element][0]['last_updated'];
                    obj['store_category_name'] = element;
                    obj['store_sub_category_name'] = store_with_sub_categories_grouped[element];
                    arr.push(obj);
                });
                const store_without_sub_categories = _.filter(categories_data, (data) => data['category_id'] == null);
                // let category_array1 = Object.keys(store_without_sub_categories);
                store_without_sub_categories.forEach((element) => {
                    let obj = {};
                    obj['store_category_name'] = element['store_category_name'];
                    obj['store_category_id'] = element['store_category_id'];
                    obj['store_image_url'] = element['image_url'];
                    obj['store_category_ranking'] = element['store_category_ranking'];
                    obj['status'] = element['status'];
                    obj['last_updated'] = element['last_updated'];
                    obj['store_sub_category_name'] = [];
                    arr1.push(obj);
                });
                Array.prototype.push.apply(arr, arr1);
            }
            if (err) {
                console.log("error: ", err);
            }
            else {
                if (category_id == 0) {
                    res.json({
                        "message": "store category list",
                        "store_categories": arr
                    });
                }
                else {
                    res.json({
                        "message": "store category list",
                        "store_categories": categories[0],
                        "store_sub_categories": categories[1] ? categories[1] : []
                    });
                }
            }
        });
    });
}
exports.getStoreCategories = getStoreCategories;
function postStoreCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('postStoreCategories');
        const newStoreCategory = req.body;
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL ADD_NEW_STORE_CATEGORY(?,?,?)`;
        let store_category_name = req.body.storeCategoryName;
        let store_category_ranking = +req.body.storeCategoryRanking;
        let status = +req.body.status;
        yield conn.query(sql, [store_category_name, store_category_ranking, status], function (err, storeCategory) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "message": "store Category not added",
                    "status": 400,
                    "category_id": 0
                });
            }
            else {
                res.json({
                    "message": "store Category added",
                    "status": 200,
                    "category_id": storeCategory[0][0]['store_category_id']
                });
            }
        });
    });
}
exports.postStoreCategories = postStoreCategories;
function deleteStoreCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        yield conn.query("DELETE FROM store_categories WHERE store_category_id = ? ", req.body.store_category_id, function (err, storeCategory) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                let deleted = false;
                if (storeCategory.affectedRows == 1) {
                    deleted = true;
                }
                res.json({
                    "message": (deleted) ? "store Category deleted successfully" : "invalid category id",
                    "status": (deleted) ? 200 : 400,
                    "category_id": req.body.store_category_id
                });
            }
        });
    });
}
exports.deleteStoreCategory = deleteStoreCategory;
function updateStoreCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        const updateStoreCategories = req.body;
        console.log(updateStoreCategories);
        console.log('-----------------------');
        yield conn.query("UPDATE store_categories SET ? WHERE store_category_id = ?", [updateStoreCategories, req.body.store_category_id], function (err, storeCategory) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                let updated = false;
                if (storeCategory.affectedRows == 1) {
                    updated = true;
                }
                res.json({
                    "message": (updated) ? "store Category updated successfully" : "invalid category id",
                    "status": (updated) ? 200 : 400,
                    "category": storeCategory,
                    "category_id": req.body.store_category_id
                });
            }
        });
    });
}
exports.updateStoreCategory = updateStoreCategory;
function updateStoreCategoryImages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL UPDATE_STORE_CATEGORY(?,?,?)`;
        let storeCategoryId = +req.body.store_category_id;
        let image_url = req.body.image_url;
        let status = 1;
        yield conn.query(sql, [storeCategoryId, image_url, status], function (err, updatedCategories) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "status": 400,
                    "message": "store category images not updated",
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "status": 200,
                    "message": "category detail",
                    "product": updatedCategories[0][0]
                });
            }
        });
    });
}
exports.updateStoreCategoryImages = updateStoreCategoryImages;
//Store Subcategories APIs
function getStoreSubCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getStoreSubCategories');
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_STORE_SUBCATEGORIES(?,?)`;
        let store_category_id = req.params.store_category_id;
        let filterBy = req.body.filterBy;
        yield conn.query(sql, [store_category_id, filterBy], function (err, subcategories) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "all sub categories of tore category list",
                    "store_sub_categories": subcategories[0]
                });
            }
        });
    });
}
exports.getStoreSubCategories = getStoreSubCategories;
function getSubCategoryData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_SUBCATEGORYINFO(?)`;
        let sub_category_id = req.params.sub_category_id;
        yield conn.query(sql, [sub_category_id], function (err, subcategories) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "sub category information",
                    "store_sub_categories": subcategories[0]
                });
            }
        });
    });
}
exports.getSubCategoryData = getSubCategoryData;
function postStoreSubCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newStoreCategory = req.body;
        const conn = yield database_1.connect_aws_grostep();
        // console.log(newStoreCategory);
        // console.log('-------------------');
        let sql = `CALL ADD_NEW_STORE_SUBCATEGORY(?,?,?,?,?)`;
        let store_category_id = +req.body.store_category_id;
        let category_name = req.body.categoryName;
        let url = '';
        // req.body.image_url?req.body.image_url :
        let status = +req.body.status;
        let ranking = +req.body.categoryRanking;
        yield conn.query(sql, [store_category_id, category_name, url, status, ranking], function (err, storeSubCategory) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "message": "store sub category not added",
                    "status": 400,
                    "category_id": 0
                });
            }
            else {
                res.json({
                    "message": "store sub category added successfully",
                    "status": 200,
                    "category_id": storeSubCategory[0][0]['store_sub_category_id']
                });
            }
        });
    });
}
exports.postStoreSubCategories = postStoreSubCategories;
function deleteStoreSubCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        yield conn.query("DELETE FROM categories WHERE category_id = ? ", req.body.category_id, function (err, storeSubCategory) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                let deleted = false;
                if (storeSubCategory.affectedRows == 1) {
                    deleted = true;
                }
                res.json({
                    "message": (deleted) ? "store sub Category deleted successfully" : "invalid category id",
                    "status": (deleted) ? 200 : 400,
                    "category_id": req.body.category_id
                });
            }
        });
    });
}
exports.deleteStoreSubCategory = deleteStoreSubCategory;
function updateStoreSubCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        const updateStoreSubCategories = req.body;
        console.log(updateStoreSubCategories);
        console.log('-----------------------');
        yield conn.query("UPDATE categories SET ? WHERE category_id = ?", [updateStoreSubCategories, req.body.category_id], function (err, storeSubCategory) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                let updated = false;
                if (storeSubCategory.affectedRows == 1) {
                    updated = true;
                }
                res.json({
                    "message": (updated) ? "store sub Category updated successfully" : "invalid category id",
                    "status": (updated) ? 200 : 400,
                    "category_id": req.body.category_id
                });
            }
        });
    });
}
exports.updateStoreSubCategory = updateStoreSubCategory;
