import { Request, Response } from 'express';
import { connect,connect_grostep, connect_aws_grostep } from '../database';
import { stat } from 'fs';


export async function fetchAllStores(req: Request, res: Response) {
    // setTimeout(() => {
    //     console.log('Hiii')
    // }, 3000);
    // console.log(req.body.page_number);
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_ALL_STORES_INFO(?,?,?)`;
    await conn.query(sql,[+req.body.page_number,+req.body.page_size,req.body.filterBy], 
        function (err: any, stores: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            res.json({
                "message":"stores information",
                "store": stores[0],
                "store_total_count":stores[1][0]
            });
        }
    });
}

export async function fetchStoreProductsById(req:Request,res:Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_STORE_PRODUCTS(?,?,?,?)`;
    await conn.query(sql,[+req.body.storeId,+req.body.page_number,+req.body.page_size,req.body.filterBy], function (err: any, store: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"Store products Information not found",
                "store_products_info": store[0],
                "store_products_count":store[1]
            });
        }
        else {
            res.json({
                status:200,
                "message":"Store products Information",
                "store_products_info": store[0],
                "store_products_count":store[1]
            });
        }
    });
}

export async function fetchStoreOrderProductsById(req:Request,res:Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_ORDER_PRODUCTS(?)`;
    await conn.query(sql,[+req.params.orderId], 
        function (err: any, orderProducts: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"Store products Information not found",
                "order_products_info": []
                // "store_products_count":store[1]
            });
        }
        else {
            res.json({
                status:200,
                "message":"Store products Information",
                "order_products_info": orderProducts[0]
                // "order_products_count":store[1]
            });
        }
    });
}

export async function fetchStoreOrdersById(req:Request,res:Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_STORE_ORDERS(?,?,?,?)`;
    await conn.query(sql,[+req.body.storeId,+req.body.page_number,+req.body.page_size,req.body.filterBy], function (err: any, storeOrders: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"Store orders Information not found",
                "store_orders_info": storeOrders[0],
                "store_order_count":storeOrders[1]
            });
        }
        else {
            res.json({
                status:200,
                "message":"Store orders Information",
                "store_orders_info": storeOrders[0],
                "store_order_count":storeOrders[1]
            });
        }
    });
}

export async function fetchStoreById(req: Request, res: Response) {
    // setTimeout(() => {
    //     console.log('Hiii')
    // }, 3000);
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_STORE_INFO(?)`;
    await conn.query(sql,[req.params.storeId], function (err: any, store: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"Store Information not found",
                "store": store[0]
            });
        }
        else {
            res.json({
                status:200,
                "message":"store Information",
                "store": store[0]
            });
        }
    });
}

export async function addNewStore(req: Request, res: Response) {
    // console.log(req.body);
    const newProduct: any = req.body;
    const conn = await connect_aws_grostep();
    let sql = `CALL ADD_NEW_STORE(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    
    let storeName = req.body.storeName;
    let storeCategoryName = +req.body.storeCategoryName;
    
    let storeEmail = req.body.storeEmail;
    let storePhoneNumber = +req.body.storePhoneNumber;
    let storeAlternateNumber = +req.body.storeAlternateNumber;

    let storeLandlineNumber = +req.body.storeLandlineNumber;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    
    let storeGSTNumber = req.body.storeGSTNumber;
    let storePANNumber = req.body.storePANNumber;
    let storeAddress = req.body.storeAddress;
    let pinCode = req.body.pinCode;
    
    let storeDescription = req.body.storeDescription;
    let storeRating = +req.body.storeRating;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let status = +req.body.status;

    // console.log(storeName + '-'+ storeEmail + '-' + storePhoneNumber+ '-' + storeAlternateNumber
    // + '-' + storeLandlineNumber+ '-' +country+ '-' +state+ '-' +city+ '-' + storeGSTNumber+ '-' +storePANNumber+ '-' +storeAddress
    // + '-' +pinCode+ '-' +storeDescription+ '-' +storeRating+ '-' +status + "-" + latitude+ "-" + longitude);

    console.log(storeDescription);

    await conn.query(sql, [storeName,storeEmail,storePhoneNumber,storeAlternateNumber,
        storeLandlineNumber,country,state,city,storeGSTNumber,storePANNumber,
        storeAddress,pinCode,storeDescription,storeRating,latitude,longitude,status,storeCategoryName], 
                     function (err: any, store: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                "message":"store not added",
                "status":400,
                "store_id":0
            });
        }
        else {
            console.log(JSON.stringify(store));
            res.json({
                "status":200,
                "message":"store added",
                "store_id":store[0][0]['store_id']
            });
        }
    });
}

export async function addStoreProducts(req: Request, res: Response) {
    // console.log(req.body);
    const newProduct: any = req.body;
    const conn = await connect_aws_grostep();
    let sql = `CALL ADD_STORE_NEW_PRODUCT(?,?,?,?,?,?,?,?,?,?,?,?)`;
    
    let product_id = +req.body.product_id;
    let store_id = +req.body.store_id;    
    let store_cost_price = +req.body.store_cost_price;
    let store_marked_price = +req.body.store_marked_price;
    let store_selling_price = +req.body.store_selling_price;
    let store_margin = +req.body.store_margin;
    let store_discount = +req.body.store_discount;
    let store_initial_quantity = +req.body.store_initial_quantity;
    let store_updated_quantity = +req.body.store_updated_quantity;
    let store_additional_quantity = +req.body.store_additional_quantity;
    let status = +req.body.status;
    let stock = + req.body.stock;

    // console.log(storeName + '-'+ storeEmail + '-' + storePhoneNumber+ '-' + storeAlternateNumber
    // + '-' + storeLandlineNumber+ '-' +country+ '-' +state+ '-' +city+ '-' + storeGSTNumber+ '-' +storePANNumber+ '-' +storeAddress
    // + '-' +pinCode+ '-' +storeDescription+ '-' +storeRating+ '-' +status + "-" + latitude+ "-" + longitude);
    
    await conn.query(sql, [product_id,store_id,store_marked_price,store_cost_price,store_selling_price,
        store_margin,store_discount,store_initial_quantity,store_updated_quantity,
        store_additional_quantity,status,stock], 
                     function (err: any, store: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                "message":"store product not added",
                "status":400,
                "store_product_mapping_id":0
            });
        }
        else {
            console.log(JSON.stringify(store));
            res.json({
                "status":200,
                "message":"store product added successfully",
                "store_product_mapping_id":store[0][0]['store_product_mapping_id']
            });
        }
    });
}

export async function updateStore(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    const updateStore =  req.body;
    await conn.query("UPDATE stores SET ? WHERE store_id = ?", [updateStore, req.params.storeId],function (err: any, store: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"store Information not updated",
                "store": store
            });

        }
        else {
            console.log(JSON.stringify(store));
            res.json({
                status:200,
                "message":"store Information updated",
                "store": store
            });
        }
    });
}

export async function updateStoreImages(req:any,res:any) {
    const conn = await connect_aws_grostep();
    let sql = `CALL UPDATE_STORE_IMAGES(?,?,?)`;
    let storeId = +req.body.store_id;
    let image_url = req.body.image_url;    
    let status = 1;
    await conn.query(sql, [storeId,image_url,status],
                     function (err: any, updatedStore: any) {     
        if (err) {
            console.log("error: ", err);
            res.json({
                "status":400,
                "message":"store images not updated",
                "product_id":0
            })
        }
        else {
            res.json({
                "status":200,
                "message":"store detail",
                "product": updatedStore[0][0]
            });
        }
    });
}

// export async function deleteStore(req: Request, res: Response)
// {
//     const conn = await connect_grostep();
//     await conn.query("DELETE FROM stores WHERE store_id = ? ", req.params.storeId,function (err: any, store: any) {
//         if (err) {
//             console.log("error: ", err);
//             res.json({
//                 status:400,
//                 "message":"store Information not deleted",
//                 "store": store
//             });
//         }
//         else {
//             console.log(JSON.stringify(store));
//             res.json({
//                 status:200,
//                 "message":"store Information deleted",
//                 "store": store
//             });
//         }
//     });
// }
