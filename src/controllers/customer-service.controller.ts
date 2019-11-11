import { Request, Response } from 'express';
import { connect,connect_grostep,connect_aws_grostep } from '../database';
import { Customer } from '../interfaces/Customer';

export async function fetchAllCustomers(req: Request, res: Response) {
   
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_ALL_CUSTOMERS(?,?,?)`;
    await conn.query(sql,[+req.body.page_number,+req.body.page_size,req.body.filterBy], 
        function (err: any, customers: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            res.json({
                "message":"customers information",
                "customers": customers[0],
                "customer_total_count":customers[1][0]
            });
        }
    });
}

export async function getCustomers(req: Request, res: Response) {
    const conn = await connect_grostep();
    let sql = `CALL GET_CUSTOMERS(?,?)`;
    await conn.query(sql,[req.params.page_number,req.params.page_size], function (err: any, customers: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(customers));
            res.json(customers);
        }
    });
}

export async function createCustomer(req: Request, res: Response) {
    const newCustomer: Customer = req.body;
    const conn = await connect_aws_grostep();
    await conn.query("INSERT INTO customer set ?", newCustomer, function (err: any, customer: any) {

        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(customer.insertId));
            res.json({
                "message":"Customer created",
                "customer_id":customer.insertId
            });
        }
    });
}

export async function fetchCustomerOrdersById(req:Request,res:Response) {
    console.log('Jeuyuyy');
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_CUSTOMER_ORDERS(?,?,?,?)`;
    await conn.query(sql,[+req.body.customerId,+req.body.page_number,+req.body.page_size,req.body.filterBy], 
        function (err: any, customerOrders: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"Customer orders Information not found",
                "customer_orders_info": customerOrders[0],
                "customer_order_count":customerOrders[1]
            });
        }
        else {
            res.json({
                status:200,
                "message":"Customer orders Information",
                "customer_orders_info": customerOrders[0],
                "customer_order_count":customerOrders[1]
            });
        }
    });
}

export async function getCustomer(req: Request, res: Response)
{
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_CUSTOMER_DETAIL(?)`;
    //GET_CUSTOMER_DETAIL
    await conn.query(sql, req.params.customerId,function (err: any, customer: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(customer[0]));
            console.log('-----------');
            console.log(JSON.stringify(customer[1]));
            res.json({
                "message" : "Customer Information",
                "status":200,
                "customer_info":customer[0],
                "customer_delivery_addresses":customer[1]
            });
            // res.json(customer);
        }
    });
}

export async function deleteCustomer(req: Request, res: Response)
{
    const conn = await connect_aws_grostep();
    await conn.query("DELETE FROM customer WHERE customer_id = ? ", req.params.customerId,function (err: any, customer: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(customer));
            res.json(customer);
        }
    });
}

export async function updateCustomer(req: Request, res: Response)
{
    const conn = await connect_aws_grostep();
    const updateCustomer =  req.body;
    await conn.query("UPDATE customer SET ? WHERE customer_id = ?", [updateCustomer, req.params.customerId],function (err: any, customer: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(customer));
            res.json(customer);
        }
    });
}
