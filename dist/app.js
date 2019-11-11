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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
var bodyParser = require("body-parser");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const customer_service_routes_1 = __importDefault(require("./routes/customer-service.routes"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const stores_routes_1 = __importDefault(require("./routes/stores.routes"));
const imageupload_routes_1 = __importDefault(require("./routes/imageupload.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
class App {
    // port : 
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        console.log(__dirname);
        this.app.use(morgan_1.default('dev'));
        this.app.use(bodyParser.json());
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads')));
        // headers and content type
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use('/posts', posts_routes_1.default);
        this.app.use('/customerapi', customer_service_routes_1.default);
        this.app.use('/productsapi', products_routes_1.default);
        this.app.use('/categoryapi', category_routes_1.default);
        this.app.use('/employeeapi', employee_routes_1.default);
        this.app.use('/storesapi', stores_routes_1.default);
        this.app.use('/orderapi', order_routes_1.default);
        this.app.use('/imageuploadapi', imageupload_routes_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('serer on port ', this.app.get('port'));
        });
    }
}
exports.App = App;
