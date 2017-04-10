const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';

/*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('HASHING =====>', hash);
    });
});
 */
var hashedPassword = "$2a$10$X5Yd2f8gUzEEjQZ3s4RzBOkfsz9ZYxlHAPUlcMVj2nmKDm8uLM7Sq";

bcrypt.compare(password, hashedPassword, (err, result) => {
    console.log('RESULT =====> ',result);
});


/*var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var verify = jwt.verify(token, '123abc');
console.log(verify);

var message = 'Hola usuario 1';
var hash = SHA256(message).toString();

console.log(`Mensaje: ${message}`);
console.log(`Mensaje: ${hash}`);
*/