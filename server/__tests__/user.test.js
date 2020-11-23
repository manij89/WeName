const request = require('supertest');
const app = require('../app');
const db = require('../models');

describe("User's operations", () => {
  let user;
  beforeAll(async () => {
    user = await db.User.create({
      firstName: 'Carlos',
      lastName: 'De Souza',
      email: 'test@test.com',
      password: 'secret',
      linkingCode: 'oindenfiensfoensf',
      liked: [],
      matched: []
    });
});

  describe('Authentication' , () => {

    test('Should register a new user', async () => {
        await request(app).post('/register').send({
        firstName: "Ritam",
        lastName: "Verma",
        email: "algoritam@test.com",
        password: "muchas"
      }).expect(201);
    });

    test('Should login existing user', async () => {
      await request(app).post('/login').send({
        email: "algoritam@test.com",
        password: "muchas"
      }).expect(200);
    });

    test('Should not login nonexisting user or with wrong credentials', async () => {
      await request(app).post('/login').send({
        email: "algoritam@test.com",
        password: "wrongpassword"
      }).expect(401);
    });
  });

  describe('User liked names', () => {
    let result;

    beforeAll(async () => {
      const { body } = await request(app).get(`/user/${user.id}`).send();
      result = body;
    });

    test('Should have 0 likes', async () => {
      expect(result.Liked.length).toBe(0);
    }); 

    test('Should have 1 like', async () => {
      await user.addLiked(24);
      const { body } = await request(app).get(`/user/${user.id}`);
      result = body;
      expect(result.Liked.length).toBe(1);
    });   
  });

  describe('User seen names', () => {
 
  });

  afterAll(async () => {
    await db.User.destroy({where: {}});
    await db.sequelize.close();
  });
});





