import { Request, Response } from 'express';
import { connect, connect_grostep, connect_aws_grostep } from '../database';
import { stat } from 'fs';
// import { Customer } from '../interfaces/Product';

export async function getProducts(req: Request, res: Response) {
    // setTimeout(() => {
    //     console.log('Hiii')
    // }, 4000);
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_PRODUCTSINFO(?,?,?)`;
    await conn.query(sql, [+req.body.page_number, +req.body.page_size,req.body.filterBy], function (err: any, products: any) {
        if (err) {
            // console.log("error: ", err);
            res.json({
                "message": "Problem fetching Products list ",
                "status": 400,
                "product_id": 0
            });
        }
        else {
            res.json({
                "message": "Product list",
                "products": products[0],
                "products_total_count": products[1][0]
            });
        }
    });
}

export async function searchProductByName(req: Request, res: Response) {
   
    const conn = await connect_aws_grostep();
    let sql = `CALL FILTER_PRODUCTS_BYNAME(?)`;
    await conn.query(sql,[req.params.productName], 
        function (err: any, products: any) {
        if (err) {
            // console.log("error: ", err);
            res.json({
                "message": "product information not found",
                "status": 400,
                "product_id": 0
            });
        }
        else {
            res.json({
                "message":"products information",
                "products": products[0],
                "products_total_count":products[1][0]
            });
        }
    });

}

export async function getcategoryProductInfo(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_CATEGORY_PRODUCTS_INFO(?)`;
    await conn.query(sql, [req.params.categoryId], function (err: any, products: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            res.json({
                "message": "Category products Information",
                "products": products[0]
            });
        }
    });
}


export async function addProduct(req: Request, res: Response) {
    console.log(req.body);
    const newProduct: any = req.body;
    const conn = await connect_aws_grostep();
    let sql = `CALL ADD_PRODUCT_DETAIL(?,?,?,?,?,?,?,?,?)`;

    let product_name = req.body.product_name;
    let product_price = +req.body.product_price;
    let weight_type = +req.body.weight_type;
    let category_id = +req.body.category_id;
    let product_code = req.body.product_code;
    let product_description = req.body.product_description;
    let product_rating = +req.body.product_rating;
    let product_weight = +req.body.product_weight;
    let status = +req.body.status;
    // console.log(product_name + '-' + product_price + '-' + weight_type + '-' + category_id
        // + '-' + product_code + '-' + product_description + '-' + product_rating + '-' + status);
    await conn.query(sql, [product_name, product_price, weight_type, category_id,
        product_code, product_description, product_rating, status,product_weight],
        function (err: any, product: any) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "message": "product not added",
                    "status": 400,
                    "product_id": 0
                });
            }
            else {
                console.log(JSON.stringify(product));
                res.json({
                    "status": 200,
                    "message": "Product added",
                    "product_id": product[0][0]['product_id']
                });
            }
        });
}

export async function getProduct(req: Request, res: Response) {
    // console.log('getProduct');
    const conn = await connect_aws_grostep();
    let sql = `CALL GET_PRODUCT_DETAIL(?)`;
    await conn.query(sql, [req.params.productId], function (err: any, product: any) {
        // console.log(product);
        if (err) {
            console.log("error: ", err);
        }
        else {
            res.json({
                "message": "Product detail",
                "product": product[0][0]
            });
        }
    });
}

export async function deleteProduct(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    await conn.query("DELETE FROM products WHERE product_id = ? ", req.params.productId, function (err: any, product: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(product));
            res.json(product);
        }
    });
}

export async function updateProduct(req: Request, res: Response) {
    const conn = await connect_aws_grostep();
    let sql = `CALL UPDATE_PRODUCT_INFO(?,?,?,?,?,?,?,?,?,?)`;
    let product_id = +req.body.product_id;
    let product_name = req.body.product_name;
    let product_price = +req.body.product_price;
    let weight_type = +req.body.weight_type;
    let category_id = +req.body.category_id;
    let product_code = req.body.product_code;
    let product_description = req.body.product_description;
    let product_rating = +req.body.product_rating;
    let product_weight = +req.body.product_weight;
    let status = +req.body.status;
    await conn.query(sql, [product_id,product_name,product_price,status,
                           weight_type,product_code,product_description,product_rating,category_id,product_weight],
                     function (err: any, updatedProduct: any) {     
        if (err) {
            console.log("error: ", err);
            res.json({
                "status":400,
                "message":"Product not updated",
                "product_id":0
            })
        }
        else {
            res.json({
                "status":200,
                "message":"Product detail",
                "product": updatedProduct[0][0]["last_updated_product_id"]
            });
        }
    });
}

export async function updateProductImages(productId:any,imageUrl:any,req:any,res:any) {
    const conn = await connect_aws_grostep();
    let sql = `CALL UPDATE_PRODUCT_IMAGES(?,?,?)`;
    let product_id = +productId;
    let image_url = imageUrl;    
    let status = 1;
    await conn.query(sql, [product_id,image_url,status],
                     function (err: any, updatedProduct: any) {     
        if (err) {
            console.log("error: ", err);
            res.json({
                "status":400,
                "message":"Product images not updated",
                "product_id":0
            })
        }
        else {
            // return res.json({ 'image_url': req.file.location });
            res.json({
                "status":200,
                'image_url': req.file.location,
                "message":"Product detail",
                "product": updatedProduct[0][0]
            });
        }
    });
}
