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

exports.getName = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await db.Name.findOne({
      where: {
        id: +id
      }
    });
    res.send(result);
    res.status(200);
  } catch (error) {
    console.error('failed fetching name', error);
    res.status(500);
  }
};
