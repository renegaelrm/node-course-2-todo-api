const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');

var id = '58e6bade98ced3f42073a51f';

if(!ObjectID.isValid(id)){
    console.log('Id no valido');
}

User.findById(id).then((user) => {
    if(!user){
        return console.log("No encontrado");
    }

    console.log(JSON.stringify(user, undefined, 2));
}, (err) =>{
    console.log(err);
});