
const { getUser, register, login, linkPartner, getLikedNames } = require( '../controllers/user');
const db = require('../models');
const bcrypt = require('bcrypt');
const { users } = require('../mocks');

const [user1, user2] = users;

describe('Mock tests', () => {
  beforeAll(async () => {
    await db.sequelize.sync();
   }
 );
  const req = {};
  const res = {
    send: jest.fn(()=> res).mockName('send'),
    status: jest.fn(()=> res).mockName('status')
  };

  describe('getUser', () => {
    req.params = {
      userId: user1.userId
    };

    db.User.findOne = jest.fn();
    db.User.findOne.mockResolvedValue(user1);

    test('getUser should be called successfully', async () => {
      await getUser(req, res);
      expect(db.User.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(user1);
    });
    
  });

  describe('register', () => {
    req.body = {
      firstName: user1.firstName,
      lastName: user1.lastName,
      email: user1.email,
      password: user1.password
    };

    db.User.create = jest.fn();
    db.User.create.mockResolvedValue(user1);

    test ('user should be able to register successfully', async() => {
      await register(req, res);
      expect(db.User.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(user1);
    });
    
  });

  describe('login', () => {
    req.body = {
      email: user1.email,
      password: user1.password
    };

    db.User.findOne = jest.fn();
    db.User.findOne.mockResolvedValue(user1);

    bcrypt.hash = jest.fn((password, salt) => Promise.resolve(password + salt));
    bcrypt.compare = jest.fn((password, hash) => Promise.resolve(password === hash.slice(0, -2)));
    
    test ('user should be able to login successfully', async() => {
      await login(req, res);
      expect(db.User.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(user1);
    });


    test ('checking that password hashing works', async () => {
      req.body = {
        email: user1.email,
        password: user1.password
      };

      const hash = await bcrypt.hash(req.body.password, 10);
      const validated = await bcrypt.compare(req.body.password, hash );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, hash);
      expect(validated).toBeTruthy();
    });

    test ('if the password is not correct validation should be false', async () => {
      req.body = {
        email: user1.email,
        password: user1.password
      };

      const hash = await bcrypt.hash(req.body.password, 10);
      const validated = await bcrypt.compare('wrongpassword', hash );
      expect(bcrypt.compare).toHaveBeenCalled();
      expect(bcrypt.compare).toHaveBeenCalledWith('wrongpassword', hash);
      expect(validated).toBeFalsy();
    });
    
  });

  describe('Linking Partners', () => {
    user1.save = jest.fn();
    user2.save = jest.fn();
    
    test ('should successfully link partners', async() => {
      req.body = {
        linkingCode: user1.linkingCode,
      };
    
      req.params = {
        id: user2.userId // 5
      };
      
      db.User.findOne = jest.fn().mockReturnValueOnce(user1).mockReturnValueOnce(user2);
      await linkPartner(req, res);

      expect(user2.partnerId).toEqual(user1.id);
      expect(user1.partnerId).toEqual(user2.id);
      expect(user1.linkingCode).toEqual(user2.linkingCode);
      
    });
  });


  describe('Get Liked Names', () => {
      
    test ('should successfully retrieve liked names', async() => {
      user1.getLiked = jest.fn();
      
      req.params = {
        id: user1.userId 
      };
      
      db.User.findOne = jest.fn();
      await getLikedNames(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});