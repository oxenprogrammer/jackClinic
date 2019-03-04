let server;
const request = require('supertest');
const { Specialization }  = require('../../models/specialization');

describe('/api/specializations', () => {
    beforeEach(() => { server = require('../../index') });
    afterEach( async () => { 
        server.close();
        await Specialization.remove({})
     }
    );

    describe('GET /', async () => {
        it('should return all specializations',  async () => {
            await Specialization.collection.insertMany(
                [
                    {name: 'Allergist'},
                    {name: 'Nurse'},
                    {name: 'Paramedic'}
                ]
            )
            const res = await request(server).get('/api/specializations');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            expect(res.body.some(s => s.name === 'Nurse')).toBeTruthy();
            expect(res.body.some(s => s.name === 'Allergist')).toBeTruthy();
        });
    });

    describe('GET /:id', async () => {
        it('should return unique specialization if valid id is passed',  async () => {
            const specialization = new Specialization({name: 'Allergist'});
            await specialization.save();

            const res = await request(server).get('/api/specializations/' + specialization._id);
            expect(res.status).toBe(200);
            // expect(res.body).toMatchObject(specialization);
            expect(res.body).toHaveProperty('name', specialization.name);
        });
    });

    describe('GET /:id', async () => {
        it('should return 404 for non existence id',  async () => {
            const res = await request(server).get('/api/specializations/' + 1);
            expect(res.status).toBe(404);
        });
    });
});
