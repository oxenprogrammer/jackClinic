const { Doctor } = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('doctor.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
            isActive: false
        }

       const user = new Doctor(payload);

       const token = user.generateAuthToken();
       const decoded = jwt.verify(token, config.get('authJWTPrivateKey'));
       
       expect(decoded).toMatchObject(payload);
    });
});

