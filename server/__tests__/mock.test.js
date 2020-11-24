
const { getUser, register, login, linkPartner } = require( '../controllers/user');
const db = require('../models');
const bcrypt = require('bcrypt');

const users = [
  {
    userId: 3,
    firstName: 'Berta',
    lastName: 'Banana',
    email : 'berta@codeworks.me',
    password: 'bananarama',
    linkingCode: 'sausages',
    liked: [],
    seen: [],
    matched: []
  },
  {
    userId: 3,
    firstName: 'Leo',
    lastName: 'Banana',
    email : 'leo@codeworks.me',
    password: 'ramabanana',
    linkingCode: 'salchichas',
    liked: [],
    seen: [],
    matched: []
  },
];

describe('Mock tests', () => {
  const req = {};
  const res = {
    send: jest.fn(()=> res).mockName('send'),
    status: jest.fn(()=> res).mockName('status')
  };

  describe('getUser', () => {
    req.params = {
      userId: users[0].userId
    };

    db.User.findOne = jest.fn();
    db.User.findOne.mockResolvedValue(users[0]);

    test('User.findOne should be called correctly', async () => {
      await getUser(req, res);
      expect(db.User.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(users[0]);
    });
    
  });

  describe('register', () => {
    req.body = {
      firstName: users[0].firstName,
      lastName: users[0].lastName,
      email: users[0].email,
      password: users[0].password
    };

    db.User.create = jest.fn();
    db.User.create.mockResolvedValue(users[0]);

    test ('User.create should have been called once', async() => {
      await register(req, res);
      expect(db.User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(users[0]);
    });
    
  });

  describe('login', () => {
    req.body = {
      email: users[0].email,
      password: users[0].password
    };

    db.User.findOne = jest.fn();
    db.User.findOne.mockResolvedValue(users[0]);
    bcrypt.hash = jest.fn((password, salt) => Promise.resolve(password + salt));
    bcrypt.compare = jest.fn((password, hash) => Promise.resolve(password === hash.slice(0, -2)));
    
    test ('User.findOne should have been called once', async() => {
      await login(req, res);
      expect(db.User.findOne).toHaveBeenCalled();

    });

    test ('login should return a status of 200 if successful', async () => {
      await login(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test ('if registered successfully, returns the user', async () => {
      await login(req, res);
      expect(res.send).toHaveBeenCalledWith(users[0]);
    });

    test ('checking that password hashing works', async () => {
      req.body = {
        email: users[0].email,
        password: users[0].password
      };

      const hash = await bcrypt.hash(req.body.password, 10);
      const validated = await bcrypt.compare(req.body.password, hash );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, hash);
      expect(validated).toBeTruthy();
    });

    test ('if the password is not correct validation should be false', async () => {
      req.body = {
        email: users[0].email,
        password: users[0].password
      };

      const hash = await bcrypt.hash(req.body.password, 10);
      const validated = await bcrypt.compare('wrongpassword', hash );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', hash);
      expect(validated).toBeFalsy();
    });
    
  });

});





