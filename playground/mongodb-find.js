//const MongoClient = require('mongodb').MongoClient;

const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to database');
    }

    console.log('Connected to database');

  /*  db.collection('Todos').find({completed: false}).toArray().then((docs) =>{
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Imposible');
    }); */

/*    db.collection('Todos').find().count().then((count) =>{
        console.log(`Todos counts ${count}`);
        
    }, (err) => {
        console.log('Imposible');
    }); */

    db.collection('Users').find({name:'Rene'}).toArray().then((data) => {
        console.log('Users');
        console.log(JSON.stringify(data, undefined, 2));
    }, (err) => {
        console.log('Error');
    });

    //db.close();
});
