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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
function fetchAllCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_ALL_CUSTOMERS(?,?,?)`;
        yield conn.query(sql, [+req.body.page_number, +req.body.page_size, req.body.filterBy], function (err, customers) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "customers information",
                    "customers": customers[0],
                    "customer_total_count": customers[1][0]
                });
            }
        });
    });
}
exports.fetchAllCustomers = fetchAllCustomers;
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCustomer = req.body;
        const conn = yield database_1.connect_aws_grostep();
        yield conn.query("INSERT INTO customer set ?", newCustomer, function (err, customer) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(customer.insertId));
                res.json({
                    "message": "Customer created",
                    "customer_id": customer.insertId
                });
            }
        });
    });
}
exports.createCustomer = createCustomer;
function fetchCustomerOrdersById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Jeuyuyy');
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_CUSTOMER_ORDERS(?,?,?,?)`;
        yield conn.query(sql, [+req.body.customerId, +req.body.page_number, +req.body.page_size, req.body.filterBy], function (err, customerOrders) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    status: 400,
                    "message": "Customer orders Information not found",
                    "customer_orders_info": customerOrders[0],
                    "customer_order_count": customerOrders[1]
                });
            }
            else {
                res.json({
                    status: 200,
                    "message": "Customer orders Information",
                    "customer_orders_info": customerOrders[0],
                    "customer_order_count": customerOrders[1]
                });
            }
        });
    });
}
exports.fetchCustomerOrdersById = fetchCustomerOrdersById;
function getCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_CUSTOMER_DETAIL(?)`;
        //GET_CUSTOMER_DETAIL
        yield conn.query(sql, req.params.customerId, function (err, customer) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(customer[0]));
                console.log('-----------');
                console.log(JSON.stringify(customer[1]));
                res.json({
                    "message": "Customer Information",
                    "status": 200,
                    "customer_info": customer[0],
                    "customer_delivery_addresses": customer[1]
                });
                // res.json(customer);
            }
        });
    });
}
exports.getCustomer = getCustomer;
function deleteCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        yield conn.query("DELETE FROM customer WHERE customer_id = ? ", req.params.customerId, function (err, customer) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(customer));
                res.json(customer);
            }
        });
    });
}
exports.deleteCustomer = deleteCustomer;
function updateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        const updateCustomer = req.body;
        yield conn.query("UPDATE customer SET ? WHERE customer_id = ?", [updateCustomer, req.params.customerId], function (err, customer) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(customer));
                res.json(customer);
            }
        });
    });
}
exports.updateCustomer = updateCustomer;
