"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_service_controller_1 = require("../controllers/customer-service.controller");
const router = express_1.Router();
router.route('/')
    // .get(getCustomers)
    .post(customer_service_controller_1.createCustomer);
router.route('/customerinfo')
    .post(customer_service_controller_1.fetchAllCustomers);
router.route('/customerinfo/customerorders')
    .post(customer_service_controller_1.fetchCustomerOrdersById);
router.route('/customerinfo/:customerId')
    .get(customer_service_controller_1.getCustomer)
    .put(customer_service_controller_1.updateCustomer)
    .delete(customer_service_controller_1.deleteCustomer);
// .post(createCustomer);
exports.default = router;
