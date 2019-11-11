import mysql from "mysql";
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
    host: 'grostep.cce5kiug4ajr.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'password',
    database: 'grostep'
};


export async function connect_aws_grostep() {

    var pool = mysql.createPool(grostepawsdb_config);
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
        return;
    });
    return pool;
}


export async function connect() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'grostep_shopper_api'
    });

    connection.connect(function (err: any) {
        if (err) throw err;
    });
    return connection;
}

export async function connect_grostep() {

    var pool = mysql.createPool(grostepdb_config);
    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        if (connection) connection.release()
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
}
