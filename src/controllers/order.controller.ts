import { Request, Response } from 'express';
import { connect,connect_grostep } from '../database';
import { stat } from 'fs';

export async function fetchOrderDetailsById(req: Request, res: Response) {
    const conn = await connect_grostep();
    let sql = `CALL GET_ORDER_INFO(?)`;
    await conn.query(sql,[+req.params.orderId], 
        function (err: any, orderData: any) {
        if (err) {
            console.log("error: ", err);
            res.json({
                status:400,
                "message":"order information not found",
                "customerInfo": [],
                "storeInfo":[],
                "paymentInfo":[]
            });  
        }
        else {
            res.json({
                "message":"order information",
                "status":200,
                "customerInfo": orderData[0],
                "storeInfo": orderData[1],
                "paymentInfo":orderData[2]
            });
        }
    });
}