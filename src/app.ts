import express, { Application } from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
var bodyParser = require("body-parser");
import IndexRoutes from './routes/index.routes';
import PostsRoutes from './routes/posts.routes';
import ProductsRoutes from './routes/products.routes';
import CategoryRoutes from './routes/category.routes';
import customer from './routes/customer-service.routes';
import employeeRoutes from './routes/employee.routes';
import storesRoutes from './routes/stores.routes';
import imageuploadRoutes from './routes/imageupload.routes';
import orderRoutes from './routes/order.routes';

export class App {
    app: Application;
    // port : 
    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000)
    }

    middlewares() {
        console.log(__dirname);
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, 'uploads')));
        // headers and content type
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    routes() {
        this.app.use(IndexRoutes);
        this.app.use('/posts', PostsRoutes);
        this.app.use('/customerapi', customer);
        this.app.use('/productsapi', ProductsRoutes);
        this.app.use('/categoryapi', CategoryRoutes);
        this.app.use('/employeeapi', employeeRoutes);
        this.app.use('/storesapi', storesRoutes);
        this.app.use('/orderapi', orderRoutes);
        this.app.use('/imageuploadapi', imageuploadRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('serer on port ', this.app.get('port'));
    }
} 