/*jshint esversion: 6 */
let server;
const request = require('supertest');
const { Patient } = require('../../models/patient');
const { Doctor } = require('../../models/doctor');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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

    describe('GET /me', async () => {
        it('should return 401 for unauthenticated access', async () => {
            const id = mongoose.Types.ObjectId();
            const res = await request(server).get(`/api/patients/${id}`);
            expect(res.status).toBe(401);
        });
        // it('should return 200 for authenticated patient', async () => {
        //     let id = new mongoose.Types.ObjectId().toHexString();
        //     const payload = {
        //         _id: id,
        //          phone: '0784760712'
        //      };
        //     const patient = new Patient(payload);
        //     const token = patient.generateAuthToken();

        //     const res = await request(server).get('/api/patients/' + id)
        //     .set('x-auth-token', token);

        //     expect(res.status).toBe(200);
        // });
    });

    describe('POST /', async () => {
        it('should create new patient', async () => {
            const res = await request(server).post('/api/patients').send({
                name: 'emmanuel',
                phone: '0784760712',
                location: 'Bunga sowya',
                dob: '05-19-1992',
                password: '12345qwerty'
            });
            expect(res.status).toBe(200);
        });

        it('should return 409 for duplicate entry', async () => {
            await request(server).post('/api/patients').send({
                name: 'emmanuel',
                phone: '0784760712',
                location: 'Bunga sowya',
                dob: '05-19-1992',
                password: '12345qwerty'
            });
            const res = await request(server).post('/api/patients').send({
                name: 'emmanuel',
                phone: '0784760712',
                location: 'Bunga sowya',
                dob: '05-19-1992',
                password: '12345qwerty'
            });
            expect(res.status).toBe(409);
        });

        it('should return 400 for error in request', async () => {
            const res = await request(server).post('/api/patients').send({
                nam: 'emmanuel',
                phone: '0784760712',
                location: 'Bunga sowya',
                dob: '05-19-1992',
                password: '12345qwerty'
            });
            expect(res.status).toBe(400);
        });
    })

});