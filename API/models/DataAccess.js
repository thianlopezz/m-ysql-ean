const connection = require('../connection');

function DataAccess() {

    this.execJsonToSp = function (stored_procedure, data = {}) {
        return new Promise((resolve, reject) => {
            connection.acquire()
                .then(conn => {

                    const exec = 'call ' + stored_procedure + '(\'' + JSON.stringify(data) + '\')';
                    console.log('exec>> ' + exec);
                    conn.query(exec, function (error, result) {
                        conn.release();
                        if (error) {
                            console.log('Error>> Metodo: "execJsonSp", "con.query">> ' + error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                }).catch(error => {
                    console.log('Error>> Metodo: "execJsonSp", "connection.acquire">> ' + error);
                    reject(error);
                });
        });
    };

    this.exec_arrayToSp = function (stored_procedure, data = []) {
        return new Promise((resolve, reject) => {
            connection.acquire()
                .then(conn => {
                    const params = getParamsArray(data);
                    const exec = 'call ' + stored_procedure + '(' + params + ')';
                    console.log('exec>> ' + exec);
                    conn.query(exec, function (error, result) {
                        conn.release();
                        if (error) {
                            console.log('Error>> Metodo: "exec_arrayToSp", "con.query">> ' + error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                })
                .catch(error => {
                    console.log('Error>> Metodo: "exec_arrayToSp", "connection.acquire">> ' + error);
                    reject(error);
                })
        });
    };

    this.exec_query = function (sql) {
        return new Promise((resolve, reject) => {
            connection.acquire()
                .then(conn => {
                    console.log('query>> ' + sql);
                    conn.query(sql, function (error, result) {
                        conn.release();
                        if (error) {
                            console.log('Error>> Metodo: "exec_query", "con.query">> ' + error);
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    });
                }).catch(error => {
                    console.log('Error>> Metodo: "exec_query", "connection.acquire">> ' + error);
                    reject(error);
                });
        })
    };

    this.getParamsArray = function (array) {
        return getParamsArray(array);
    };

    function getParamsArray(array) {

        let params = '';
        for (let i = 0; i < array.length; i++) {
            if (i < array.length - 1) {
                params += '\'' + array[i] + '\',';
            } else if (i === array.length - 1) {
                params += '\'' + array[i] + '\'';
            }
        }
        return params;
    }
}

module.exports = new DataAccess();
