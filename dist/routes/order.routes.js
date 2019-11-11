"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.Router();
router.route('/:orderId')
    .get(order_controller_1.fetchOrderDetailsById);
exports.default = router;
