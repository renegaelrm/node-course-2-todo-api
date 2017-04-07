const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
        text: 'Texto nuevo 1'
    },{
    text: 'Texto nuevo 2'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('Should create new todo', (done) => {
        var text = 'Text to do text';

        request(app)
        .post('/todos')
        .send({
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            if(err ){
                return done(err);
            }

            Todo.find().then((todos) =>{
                console.log(`Pruebas cantidad: ${todos.length}`);
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done());
        });
    });

    it('no debe crear con datos invalidos', () => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err){
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(0);
            }).catch((err) => done(e));
        });
    });

    describe('GET /todos', () => {
        it('Debe obtener todos los registros', (done)=> {
            request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
        });
    });
});