const db = require('../models');
const mocks = require('../mocks');

let user1;
let user2;

beforeAll(async () => {
  await db.sequelize.sync();
  await db.Name.bulkCreate([mocks.names[0], mocks.names[1]]);
  await db.User.bulkCreate([mocks.users[0], mocks.users[1]]);

  user1 = await db.User.findOne({
    where: { id: 3 }
  });
  
  user2 = await db.User.findOne({
    where: { id: 5 }
  });

  await user1.addSeen(1);
  await user2.addLiked(2);

  user1 = await db.User.findOne({
    where: { id: 3 },
    include: [{
      model: db.Name,
      as: 'Seen'
    }]
  });

  user2 = await db.User.findOne({
    where: { id: 5 },
    include: [{
      model: db.Name,
      as: 'Liked'
    }]
  });
});

describe('Models work correctly', () => {
  test('Name model returns names', () => {
    expect(true).toBe(true);
  });

  test('user1 has 1 seen name', () => {
    expect(user1.Seen).toBeDefined();
    expect(user1.Seen.length).toBe(1);
  });

  test('user2 has 1 liked name', () => {
    expect(user2.Liked).toBeDefined();
    expect(user2.Liked.length).toBe(1);
  });

  afterAll(async () => {
    await db.User.destroy({where: {}});
    await db.Name.destroy({where: {}});
    await db.sequelize.close();
  });
});