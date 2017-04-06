//const MongoClient = require('mongodb').MongoClient;

const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to database');
    }

    console.log('Connected to database');

 /*  db.collection('Todos').insertOne({
        text:'mi texto',
        completed: false
    }, (err, result) =>{
        if(err){
            return console.log('ERROR al insertar');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }); 


    db.collection('Users').insertOne({
        name: 'Rene',
        age: 29,
        location: 'Sonora4'
    }, (err, result) => {
        if(err){
            return console.log('Error al insertar en Users');
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    }); */ 

    db.close();
});
