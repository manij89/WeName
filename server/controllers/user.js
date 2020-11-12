const db = require('../models');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params
    const result = await db.User.findOne({ where: { id: id } });
    res.send(result);
    res.status(200);
  } catch (error) {
    console.error('failed fetching names', error);
    res.status(500);
  }
};

exports.register = async (req, res) => {
  const {firstName, lastName, email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      liked: [],
      matched: []
    });
    res.send(req.body);
    res.status(201);
  } catch (error) {
    console.error('failed creating user', error);
    res.status(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({where: { email: email }});
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};




// exports.login = (req, res) = {};

// exports.delete = (req, res) = {};