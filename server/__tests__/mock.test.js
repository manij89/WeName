
const { getUser, register, login, linkPartner, getLikedNames } = require( '../controllers/user');
const db = require('../models');
const bcrypt = require('bcrypt');

const users = [
  {
    userId: 3,
    id: 3,
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
    userId: 5,
    id: 5,
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

// mock name not used
const name = {
  id: 100,
  name: 'Ewa',
  gender: 'girl'
};

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

    test('getUser should be called successfully', async () => {
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

    test ('user should be able to register successfully', async() => {
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
    
    test ('user should be able to login successfully', async() => {
      await login(req, res);
      expect(db.User.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
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

  describe('Linking Partners', () => {
    users[0].save = jest.fn();
    users[1].save = jest.fn();
    
    test ('should successfully link partners', async() => {
      req.body = {
        linkingCode: users[0].linkingCode,
      };
    
      req.params = {
        id: users[1].userId // 5
      };
      
      db.User.findOne = jest.fn().mockReturnValueOnce(users[0]).mockReturnValueOnce(users[1]);
      await linkPartner(req, res);

      expect(users[1].partnerId).toEqual(users[0].id);
      expect(users[0].partnerId).toEqual(users[1].id);
      expect(users[0].linkingCode).toEqual(users[1].linkingCode);
      
    });
  });


  describe('Get Liked Names', () => {
      
    test ('should successfully retrieve liked names', async() => {
      users[0].getLiked = jest.fn();
      
      req.params = {
        id: users[0].userId 
      };
      
      db.User.findOne = jest.fn();
      await getLikedNames(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});