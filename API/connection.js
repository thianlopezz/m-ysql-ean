const mysql = require('mysql');

function Connection() {
    this.pool = null;

    this.init = function () {
        this.pool = mysql.createPool({
            connectionLimit: 15,
            host: '',
            port: 3306,
            user: '',
            password: '',
            database: ''
        });
    };

    this.acquire = function () {
        return new Promise((resolve, reject)=>{
            this.pool.getConnection(function (error, connection) {
                if(error){
                    reject(error);             
                } else {
                    resolve(connection);             
                }
            });
        })
    };
}

module.exports = new Connection();
