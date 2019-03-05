/*jshint esversion: 6 */
let server;
const request = require('supertest');
const { Patient } = require('../../models/patient');

describe('/api/patient', () => {
    beforeEach(() => {server = require('../../index');});
    afterEach( async () => {
        server.close();
        await Patient.remove({});
    });

    describe('GET /', async () => {
        it('should return 401 for unauthenticated access', async () => {
            const res = await request(server).get('/api/patients');
            expect(res.status).toBe(401);
        })
    })

});