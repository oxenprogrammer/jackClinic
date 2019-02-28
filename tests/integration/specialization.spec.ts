let server;
const request = require('supertest');

describe('/api/specializations', () => {
    beforeEach(() => { server = require('../../index') });
    afterEach(() => { server.close() });

    describe('GET /', () => {
        it('should return all specializations',  async () => {
            const res = await request(server).get('/api/specializations');
            expect(res.status).toBe(200)
        });
    });
});
