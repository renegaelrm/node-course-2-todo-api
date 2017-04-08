const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var verify = jwt.verify(token, '123abc');
console.log(verify);

/*var message = 'Hola usuario 1';
var hash = SHA256(message).toString();

console.log(`Mensaje: ${message}`);
console.log(`Mensaje: ${hash}`);
*/