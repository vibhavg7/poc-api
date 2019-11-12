import { Request, Response } from 'express';
import { connect, connect_grostep, connect_aws_grostep } from '../database';

export async function getEmployees(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_ALL_Employees(?,?,?)`;
    await conn.query(sql, [+req.body.page_number, +req.body.page_size, req.body.filterBy], function (err: any, employees: any) {
        if (err) {
            // console.log("error: ", err);
            res.json({
                "status": 401,
                "message": "Employee Details not found",
                "employeeData": employees[0]
            });
        }
        else {
            res.json({
                "message": "Employees list",
                "employees": employees[0],
                "employees_total_count": employees[1][0]
            });
        }
    });
}

export async function validateEmployee(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL validateEmployee(?,?)`;
    await conn.query(sql, [req.body.user_name, req.body.password], function (err: any, employeeData: any) {
        if (err) {
            res.json({
                "status": 401,
                "message": "Employee Details not found",
                "employeeData": employeeData[0]
            });
        }
        else {
            res.json({
                "status": 200,
                "message": "Employee Details",
                "employeeData": employeeData[0]
            });
        }
    });
}
// {user_name: "vibhavg91", password: "vibhavg91"}
// export async function getcategoryProductInfo(req: Request, res: Response) {
//     const conn = await connect_grostep();
//     let sql = `CALL GET_CATEGORY_PRODUCTS_INFO(?)`;
//     await conn.query(sql,[req.params.categoryId], function (err: any, products: any) {
//         if (err) {
//             console.log("error: ", err);
//         }
//         else {
//             res.json({
//                 "message":"Category products Information",
//                 "products": products[0]
//             });
//         }
//     });
// }


// export async function addProduct(req: Request, res: Response) {
//     console.log(req.body);
//     const newProduct: any = req.body;
//     const conn = await connect_grostep();
//     let sql = `CALL ADD_PRODUCT_DETAIL(?,?,?,?)`;
//     let product_name = req.body.product_name;
//     let product_price = +req.body.product_price;
//     let weight_type = +req.body.weight_type;
//     let category_id = +req.body.category_id;
//     console.log(product_name + '-' + product_price + '-' + weight_type +'-' + category_id);
//     await conn.query(sql, [product_name,product_price,weight_type,category_id], 
//                      function (err: any, product: any) {
//         if (err) {
//             console.log("error: ", err);
//         }
//         else {
//             console.log(JSON.stringify(product.insertId));
//             res.json({
//                 "message":"Product added",
//                 "customer_id":product.insertId
//             });
//         }
//     });
// }

// export async function getProduct(req: Request, res: Response)
// {
//     const conn = await connect_grostep();
//     let sql = `CALL GET_PRODUCT_DETAIL(?)`;
//     await conn.query(sql, [req.params.productId],function (err: any, product: any) {
//         if (err) {
//             console.log("error: ", err);
//         }
//         else {
//             res.json({
//                 "message":"Product detail",
//                 "product": product[0][0]
//             });
//         }
//     });
// }

// export async function deleteProduct(req: Request, res: Response)
// {
//     const conn = await connect_grostep();
//     await conn.query("DELETE FROM product WHERE product_id = ? ", req.params.productId,function (err: any, product: any) {
//         if (err) {
//             console.log("error: ", err);
//         }
//         else {
//             console.log(JSON.stringify(product));
//             res.json(product);
//         }
//     });
// }

// export async function updateProduct(req: Request, res: Response)
// {
//     const conn = await connect_grostep();
//     const updateProduct =  req.body;
//     await conn.query("UPDATE product SET ? WHERE product_id = ?", [updateProduct, req.params.productId],function (err: any, product: any) {
//         if (err) {
//             console.log("error: ", err);
//         }
//         else {
//             console.log(JSON.stringify(product));
//             res.json(product);
//         }
//     });
// }
