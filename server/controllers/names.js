const db = require('../models');

exports.getNamesByGender = async (req, res) => {
  try {
    const { gender } = req.params;
    const result = await db.Name.findAll({
      where: {
        gender: gender
      }
    });
    res.send(result);
    res.status(200);
  } catch (error) {
    console.error('failed fetching names', error);
    res.status(500);
  }
};
