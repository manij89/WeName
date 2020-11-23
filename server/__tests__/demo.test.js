
const { getUser, register, login, linkPartner } = require( '../controllers/user');
const db = require('../models');
const bcrypt = require('bcrypt');

jest.mock('../models/', () => ({ User: {
  findOne: jest.fn(),
  create: jest.fn(),
}}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));



const mockUser = {
  userId: 3,
  firstName: 'Berta',
  lastName: 'Banana',
  email : 'berta@codeworks.me',
  password: 'bananarama',
  linkingCode: 'sausages',
  liked: [],
  seen: [],
  matched: []
};

const mockUser2 = {
  userId: 5,
  firstName: 'Leo',
  lastName: 'Banana',
  email : 'leo@codeworks.me',
  password: 'ramabanana',
  linkingCode: 'salchichas',
  liked: [],
  seen: [],
  matched: []
};


describe('User controller unit test', () => {
  const req = {};
  const res = {
    send: jest.fn(()=> res).mockName('send'),
    status: jest.fn(()=> res).mockName('status')
  };

  describe('getUser', () => {
    req.params = {
      userId: mockUser.userId
    };

    db.User.findOne.mockResolvedValue(mockUser);

    test ('User.findOne should have been called once', async() => {
      await getUser(req, res);
      expect(db.User.findOne).toHaveBeenCalled();

    });

    test ('getUser should return a res.status which is called with code 200', async () => {
      await getUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test ('expect the result sent back to be equal to the mockUser', async () => {
      await getUser(req, res);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
    
  });

  describe('register', () => {
    req.body = {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      email: mockUser.email,
      password: mockUser.password
    };

    db.User.create.mockResolvedValue(mockUser);

    test ('User.create should have been called once', async() => {
      await register(req, res);
      expect(db.User.create).toHaveBeenCalled();

    });

    test ('register should return status of 201 if successful', async () => {
      await register(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });

    test ('if registered successfully, returns the user', async () => {
      await register(req, res);
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
    
  });

  describe('login', () => {
    req.body = {
      email: mockUser.email,
      password: mockUser.password
    };
    db.User.findOne.mockResolvedValue(mockUser);
    
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
      expect(res.send).toHaveBeenCalledWith(mockUser);
    });
    
  });

  describe('linkPartner', () => {
    req.body = {
      linkingCode: mockUser.linkingCode
    };

    req.params = {
      id: mockUser2.id
    };

    db.User.findOne.mockResolvedValue(mockUser);
    
    test ('User.findOne should have been called once', async() => {
      await linkPartner(req, res);
      expect(db.User.findOne).toHaveBeenCalled();

    });

    // test ('login should return a status of 200 if successful', async () => {
    //   await login(req, res);
    //   expect(res.status).toHaveBeenCalledWith(200);
    // });

    // test ('if registered successfully, returns the user', async () => {
    //   await login(req, res);
    //   expect(res.send).toHaveBeenCalledWith(mockUser);
    // });
    
  });





});


