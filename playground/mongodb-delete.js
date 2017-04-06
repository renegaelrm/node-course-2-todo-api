//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to database');
    }
    console.log('Connected to database');

  /*  db.collection('Todos').deleteMany({text:'Jueves 6 de Abril'}).then((data) => {
        console.log(data);
    }); */

   /* db.collection('Todos').deleteOne({text: 'Nuevo doc'}).then((data) => {
        console.log(data);
    }); */

  /*  db.collection('Todos').findOneAndDelete({completed:true}).then((data) => {
        console.log(data);
    }); */

    db.collection('Users').deleteMany({name: 'Rene'});

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('58e6770f456b081154e4ffd1')
    }).then((data) =>{
        console.log(JSON.stringify(data, undefined, 2));
    }, (err) =>{
        consol.log('Error al encontrar y eliminar');
    });

    //db.close();
});