"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_controller_1 = require("../controllers/employee.controller");
const router = express_1.Router();
// router.route('/')
// .get(getPosts)
// .post(createPosts);
router.route('/validate')
    .post(employee_controller_1.validateEmployee);
// router.route('/:postId')
// .get(getPost)
// .put(updatePost)
// .delete(deletePost);
// .post(createPosts);
exports.default = router;
