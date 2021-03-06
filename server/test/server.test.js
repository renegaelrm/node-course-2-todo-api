const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('Should create new todo', (done) => {
        var text = 'Text to do text';

        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
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
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done());
        });
    });

    it('no debe crear con datos invalidos', () => {
        request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
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
        it('Debe obtener todos los registros', (done) => {
            request(app)
            .get('/todos')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(1);
            })
            .end(done);
        });
    });

    describe('GET /todos/:id', () => {
        it('Debería de regresar un documento', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
        });

        it('No debería de regresar un documento creado por otro usuario', (done) => {
            request(app)
            .get(`/todos/${todos[1]._id.toHexString()}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
        });

        it('Regresa 404 si no lo encuentra', (done) => {
            var hexId = new ObjectID().toHexString();

            request(app)
            .get(`/todos/${hexId}`)
            .set('x-auth', users[0].tokens[0].token)
            .expect(404)
            .end(done);
        });
    });

    describe('DELETE /todos/:id', () => {
        it('Deberia eliminar un documento', (done) => {
            var hexId = todos[1]._id.toHexString();

            request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((doc) => {
                    expect(doc).toNotExist();
                    done();
                }).catch((err) => done(err));
            });
        });

    it('Deberia eliminar un documento', (done) => {
            var hexId = todos[0]._id.toHexString();

            request(app)
            .delete(`/todos/${hexId}`)
            .set('x-auth', users[1].tokens[0].token)
            .expect(404)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.findById(hexId).then((doc) => {
                    expect(doc).toExist();
                    done();
                }).catch((err) => done(err));
            });
        });

 /*    it('Deberia retornar 404 si no elimina un documento', (done) => {
            
        })

        it('Deberia retornar 404 si el object id es invalido', (done) => {
                        
        }) */
    });
});

describe('GET /users/me', () => {
    it('Deberia regresar un usuario autenticado', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });

    it('Deberia regresas 401 de no autorizado', (done) => {
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res) => {
            expect(res.body).toEqual({});
        })
        .end(done);
    });

    describe('POST /users', () => {
        it('Deberia crear a un usuario', (done) => {
            var email = 'ejemplo@ejemplo.com';
            var password = '123456789';

            request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }

                User.findOne({email}).then((user)=> {
                    expect(user).toExist();
                    expect(user.password).toNotBe(password);
                    done();
                }).catch((err) => done(err));
            });
        });

        it('Deberia regresas errores de validacion si el request es invalido', (done) => {
            request(app)
            .post('/users')
            .send({
                email: 'rene',
                password: '123'
            })
            .expect(400)
            .end(done);
        });

        it('No deberia crear un usuario si el email esta en uso', (done) => {
            request(app)
            .post('/users')
            .send({
                email: users[0].email,
                password: '123456789'
            })
            .expect(400)
            .end(done);
        });
    });
});

describe('POST /users/login', () => {
    it('Loguea a usuario y retorna token', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res) => {
            expect(res.headers['x-auth']).toExist();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }            

            User.findById(users[1]._id).then((user) => {   
                expect(user.tokens[1]).toInclude({
                    access: 'auth',
                    token: res.headers['x-auth']
                });
                done();
            }).catch((err) => {
                done(err)
            });
        });
    });

    it('Rechaza login invalido', (done) => {
        request(app)
        .post('/users/login')
        .send({
            email: users[1],
            password: users[1].password + '1'
        })
        .expect(400)
        .expect((res) => {
            expect(res.headers['x-auth']).toNotExist();
        })
        .end((err, res) => {
            if(err){
                return done(err);
            }

            User.findById(users[1]._id).then((user) => {
                expect(user.tokens.length).toBe(1);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('DELETE /users/me/token', () => {
    it('Deberia de eliminar un token de un usuario en logout', () => {

        request(app)
        .delete('/users/me/token')
        .send('x-auth', users[0].tokens[0].token)
        .expect(200)
        .end((err, res) => {
            if(err){
                return done(err);
            }

            User.findById(user[0]._id).then((user) => {
                expect(user.tokens.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});