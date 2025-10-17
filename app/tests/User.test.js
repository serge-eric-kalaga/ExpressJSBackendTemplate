const request = require('supertest');
const app = require('../Index');
const { errorMonitor } = require('supertest/lib/test');
const faker = require('@faker-js/faker').faker;
const { Sequelize, DataTypes, Model } = require("sequelize");

const TEST_USERNAME = faker.internet.username({
    provider: 'github',
    length: { min: 5, max: 15 }
});
const TEST_PASSWORD = 'test1234';

describe('GET users list /users', () => {
    it('devrait retourner 200', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });
});

describe('POST create user /users', () => {
    it('devrait créer un utilisateur et retourner 200', async () => {
        const newUser = {
            nom_prenom: faker.person.fullName(),
            username: TEST_USERNAME,
            password: TEST_PASSWORD,
            role: 'USER'
        };

        const res = await request(app)
            .post('/users')
            .send(newUser);

        expect(res.statusCode).toBe(200);
        expect(res.body?.data).toHaveProperty('id');
        expect(res.body?.data.nom_prenom).toBe(newUser.nom_prenom);
        expect(res.body?.data.username).toBe(newUser.username);
        expect(res.body?.data.role).toBe(newUser.role);
    });
});

describe('POST create user with invalid data /users', () => {
    it('devrait retourner 400 pour des données invalides', async () => {
        const invalidUser = {
            nom_prenom: 'Jo',
            username: 'ab',
            password: '12',
            role: 'INVALID_ROLE'
        };

        const res = await request(app)
            .post('/users')
            .send(invalidUser);

        expect(res.body?.statusCode).toBe(400);
        expect(res.status).toBe(400);
    });
});

describe('GET user by ID /users/:username', () => {
    it('devrait retourner un utilisateur existant', async () => {
        const res = await request(app).get(`/users/${TEST_USERNAME}`);
        expect(res.statusCode).toBe(200);
        expect(res.body?.data).toHaveProperty('username', TEST_USERNAME);
    });

    it('devrait retourner 404 pour un utilisateur non existant', async () => {
        const res = await request(app).get('/users/nonexistentuser12345');
        expect(res.statusCode).toBe(404);
    });
});

// Login
describe('POST login /users/auth/login', () => {
    it('devrait se connecter avec des informations valides', async () => {
        const res = await request(app)
            .post('/users/auth/login')
            .send({
                username: TEST_USERNAME,
                password: TEST_PASSWORD
            });

        expect(res.body.statusCode).toBe(200);
        expect(res.status).toBe(200);
        expect(res.body?.data).toHaveProperty('token');
    });

    it('devrait retourner 401 pour des informations invalides', async () => {
        const res = await request(app)
            .post('/users/auth/login')
            .send({
                username: 'admin',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toBe(401);
    });
});