'use strict';

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
      
  },
  {
    timestamps: false
  }
  );

  Session.associate = db => {
      db.Session.hasMany(db.Users);
  }

  return Session;
}