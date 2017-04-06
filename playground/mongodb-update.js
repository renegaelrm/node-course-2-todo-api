//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to database');
    }
    console.log('Connected to database');

   /* db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('58e6753d9828031ff4dcf73a')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((data) =>{
        console.log(data);
    }); */

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('58e679237d969818d8fc1ece')
    }, {
        $set: {
            name: 'Rene Gael'
        },
        $inc: {
            age: 1
        }
    }, 
    {
        returnOriginal: false
    }).then((data) =>{
        console.log(data);
    });

    //db.close();
});