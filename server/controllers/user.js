const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret_key} = require('../config');
const { v4: uuidv4 } = require('uuid');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.User.findOne({
      where: {
        id: +id
      }
    });
    res.send(result);
    res.status(200);
  } catch (error) {
    console.error('failed fetching names', error);
    res.status(500);
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await db.User.findOne({
    where: {
      email: email
    }
  });
  if (user)
    return res
      .status(409)
      .send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      liked: [],
      matched: []
    });
    const { id } = newUser.id;
    const accessToken = jwt.sign({ id }, secret_key);
    res.status(201).send({ accessToken });
  } catch (error) {
    console.error('failed creating user', error);
    res.status(500);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const accessToken = jwt.sign({ id: user.id }, secret_key);
    res.status(200).send({ accessToken });
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

exports.createLinkingCode = async (req, res) => {
  try {
    const { id } = req.params;
    const code = uuidv4();
    const result = await db.User.update(
      { linkingCode: code },
      { returning: true, where: { id: id } }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
    console.error('no linking code created', error);
  }
};

exports.linkPartner = async (req, res) => {
  try {
    const { linkingCode } = req.body;
    const { id } = req.params; // user 2
    const user1 = await db.User.findOne({
      where: { linkingCode: linkingCode }
    });
    await db.User.update(
      { partnerId: id},
      { returning: true, where: { id: user1.id } 
      });

    const user2 = await db.User.update(
      {
        linkingCode: linkingCode,
        partnerId: user1.id
      },
      {returning: true, where: {id: id}}
    );
    res.status(200).send(user1, user2);
  } catch (error) {
    res.status(500);
    console.error('failed to connect partners', error);
  }
};

exports.getLikedNames = async (req,res) => {
  try {
    const { userId } = req.params;
    const user = await db.User.findOne({
      where: {
        id: +userId
      }
    });
    const result = await user.getLiked();
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
    console.error('failed to get liked names', error);
  }
};

exports.getSeenNames = async (req,res) => {
  try {
    const { userId } = req.params;
    const user = await db.User.findOne({
      where: {
        id: +userId
      }
    });
    const result = await user.getSeen();
    res.status(200).send(result);
  } catch (error) {
    res.status(500);
    console.error('failed to get seen names', error);
  }
};

exports.updateSeenNames = async (req, res) => {
  try {
    const { userId, nameId } = req.params;
    const user = await db.User.findOne({
      where: {
        id: +userId
      }
    });
    const result = await user.addSeen(+nameId);
    res.status(201).send(result);
  } catch (error) {
    console.error('failed updating seen names', error);
    res.status(500);
  }
};

exports.updateLikedNames = async (req, res) => {
  try {
    const { userId, nameId } = req.params;
    const user = await db.User.findOne({
      where: {
        id: +userId
      }
    });
    const result = await user.addLiked(+nameId);
    res.status(201).send(result);
  } catch (error) {
    console.error('failed updating liked names', error);
    res.status(500);
  }
};

// exports.delete = (req, res) = {};