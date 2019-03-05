/*jshint esversion: 6 */
let server;
const request = require('supertest');
const { Patient } = require('../../models/patient');
const { Doctor } = require('../../models/doctor');

describe('/api/patient', () => {
    beforeEach(() => {server = require('../../index');});
    afterEach( async () => {
        server.close();
        await Patient.remove({});
        await Doctor.remove({});
    });

    describe('GET /', async () => {
        it('should return 401 for unauthenticated access', async () => {
            const res = await request(server).get('/api/patients');
            expect(res.status).toBe(401);
        });
        
        it('should return 403 if doctor is inactive', async () => {
            const token = new Doctor().generateAuthToken();
            const res = await request(server).get('/api/patients')
                .set('x-auth-token', token);
            expect(res.status).toBe(403);
        })

        it('should return 200 if doctor is  authenticated and active', async () => {
            const payload = {
                isActive: true,
                isAdmin: false
            };

            const doctor = new Doctor(payload);

            const token = doctor.generateAuthToken();

            const res = await request(server).get('/api/patients')
                .set('x-auth-token', token);

            expect(res.status).toBe(200);
        })
    })

});