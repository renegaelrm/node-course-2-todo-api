const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {User} = require('./../server/models/user');
const {Todo} = require('./../server/models/todo');


/* Todo.remove({}).then ((result) => {
    console.log(result);
});

Todo.findOneAndRemove().then(() => {

}); */

Todo.findByIdAndRemove('58e8050b3d95645f2743e140').then((data) => {
    console.log(data);
});
