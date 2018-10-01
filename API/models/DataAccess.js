const connection = require('../connection');

function DataAccess() {

    this.exec_objectToSp = function (stored_procedure, data = {}) {
        return new Promise((resolve, reject)=> {
            connection.acquire()
            .then(conn=>{
                const params = getParamsObject(data);

                const exec = 'call ' + stored_procedure + '(\'' + params + '\')';
                console.log('exec>> ' + exec);
                conn.query(exec, function (error, result) {
                    conn.release();
                    if (error) {
                        console.log('Error>> Metodo: "exec_objectToSp", "con.query">> ' + error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            }).catch(error=>{
                console.log('Error>> Metodo: "exec_objectToSp", "connection.acquire">> ' + error);
                reject(error);
            });
        });
    };

    this.exec_arrayToSp = function (stored_procedure, data = []) {
        return new Promise((resolve, reject)=>{            
        connection.acquire()
        .then(conn=>{
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
        .catch(error=>{            
            console.log('Error>> Metodo: "exec_arrayToSp", "connection.acquire">> ' + error);
            reject(error);
        }) 
        });
    };

    this.exec_query = function (sql) {
        return new Promise((resolve, reject)=>{
            connection.acquire()
            .then(conn=>{
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
            }).catch(error=>{
                console.log('Error>> Metodo: "exec_query", "connection.acquire">> ' + error);
                    reject(error);
            });
        })
    };

    this.getParamsObject = function (data) {
        return getParamsObject(data);
    };

    this.getParamsArray = function (array) {
        return getParamsArray(array);
    };

    this.attachProperty = function (xml, array = []) {

        const index = xml.indexOf('/>');

        if (index === -1) {
            throw (new Error('El xml no posee un formato correcto'))
        } else {

            xml = xml.substring(0, index) + ' ';
            for (let prop in array) {
                xml += prop + ' = "' + array[prop] + '" ';
            }

            xml += '/>';

            return xml;
        }
    }

    function getParamsObject(data) {

        let params = '<params ';

        for (let prop in data) {
            params += prop + ' = "' + data[prop] + '" ';
        }

        params += '/>';

        return params;
    }

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
