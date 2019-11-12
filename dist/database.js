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
const mysql_1 = __importDefault(require("mysql"));
var util = require('util');
var grostepdb_config = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'grostep'
};
var grostepawsdb_config = {
    connectionLimit: 1000,
    host: 'vibhavg91.cce5kiug4ajr.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'grostep'
};
function connect_aws_grostep() {
    return __awaiter(this, void 0, void 0, function* () {
        var pool = mysql_1.default.createPool(grostepawsdb_config);
        pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection)
                connection.release();
            return;
        });
        return pool;
    });
}
exports.connect_aws_grostep = connect_aws_grostep;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        var connection = mysql_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'grostep_shopper_api'
        });
        connection.connect(function (err) {
            if (err)
                throw err;
        });
        return connection;
    });
}
exports.connect = connect;
function connect_grostep() {
    return __awaiter(this, void 0, void 0, function* () {
        var pool = mysql_1.default.createPool(grostepdb_config);
        pool.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection)
                connection.release();
            return;
        });
        return pool;
        // connection.connect(function (err: any) {
        //     if (err) {                                     // or restarting (takes a while sometimes).
        //         console.log('error when connecting to db:', err);
        //         setTimeout(connect_grostep, 2000); // We introduce a delay before attempting to reconnect,
        //     }
        // });
        // connection.on('error', function (err) {
        //     console.log('db error', err);
        //     if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        //         connect_grostep();                         // lost due to either server restart, or a
        //     } else {                                      // connnection idle timeout (the wait_timeout
        //         throw err;                                  // server variable configures this)
        //     }
        // });
        // return connection;
    });
}
exports.connect_grostep = connect_grostep;
