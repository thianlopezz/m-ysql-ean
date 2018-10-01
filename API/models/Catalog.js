const axios = require('axios');
const API = process.env.API_CHASKIY || 'https://www.chaskiy.com/chaskiy/api';
// const API = process.env.API_CHASKIY || 'http://localhost:5000/chaskiy/api';

function Catalog() {

    this.getPaises = function (res) {

        axios.get(API + '/paises')
            .then(function (response) {

                res.send({ success: true, data: response.data.data });
            })
            .catch(function (error) {

                console.log('Error>> getPaises>> ' + error.message);
                res.send({ success: false, mensaje: error.message });
            });
    };
}

module.exports = new Catalog();
