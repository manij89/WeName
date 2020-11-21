const db = require('../models');
const mocks = require('../mocks');

describe('testing relationship between models', () => {
 
  // Before any tests run
  beforeAll(async () => {
    await db.sequelize.sync();
  });



  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await thisDb.sequelize.close()
  })
})


 