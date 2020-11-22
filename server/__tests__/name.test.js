const db = require('../models');

let user;
describe('Get user', () => {
 
  // Before any tests run
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
  })

  describe('Add likes correctly', () => {
    let result;
    console.log(user);
    
    beforeAll(async () => {
      await user.addLiked(3);

      result = await db.User.findOne({
        where: {
          id: user.id
        },
        include: [{
          model: db.Name,
          as: 'Seen'
        },{
          model: db.Name,
          as: 'Liked'
        }]
      });
  });
      
    console.log(user);

    it('should have 1 like', () => {
      expect(result.Liked.length).toBe(1);
    });
  })

  describe('User does not have liked names',() => {})
  it('should test that true === true', () => {
    expect(true).toBe(true)
  });
  
  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await db.sequelize.close()
  });
})
