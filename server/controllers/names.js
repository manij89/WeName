const db = require('../models');

exports.getNames =  async (req, res) => {
  try {
    const result = await db.Name.findAll();
    res.send(result);
    res.status(200);
  } catch (error) {
    console.error('failed fetching names', error);
    res.status(500);
  }
}
