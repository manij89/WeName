const db = require('../models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.User.findOne({
      where: {
        id: id
      },
      include: [{
        model: db.Name,
        as: 'Seen'
      },{
        model: db.Name,
        as: 'Liked'
      }]
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
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hash,
      linkingCode: uuidv4(),
      liked: [],
      matched: []
    });
    res.status(201).send(user);

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
    res.status(200).send(user);
  } catch (error) {
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
};

exports.linkPartner = async (req, res) => {
  try {
    const { linkingCode } = req.body;
    const { id } = req.params; // user 2

    const user1 = await db.User.findOne({where: { linkingCode: linkingCode }});
    user1.partnerId = +id;
    await user1.save();

    const user2 = await db.User.findOne({where: { id: +id }});
    user2.linkingCode = linkingCode;
    user2.partnerId = user1.id;
    await user2.save();
    
    res.status(200).send({user1, user2});
  
  } catch (error) {
    res.status(500);
    console.error('failed to connect partners', error);
  }
};

exports.getLikedNames = async (req, res) => {
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

exports.getSeenNames = async (req, res) => {
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

exports.deleteLikedName = async (req, res) => {
  try {
    const { userId, nameId } = req.params;
    const user = await db.User.findOne({
      where: {
        id: +userId
      }
    });
    await user.removeLiked(+nameId);
    res.sendStatus(204);
  } catch (error) {
    console.error('failed deleting liked names', error);
    res.status(500);
  }
};


