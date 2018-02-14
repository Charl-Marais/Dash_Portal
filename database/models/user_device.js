'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Device = sequelize.define('User_Device', {
  	deviceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  // User_Device.associate = function(models) {
  //   User_Device.hasOne(models.Device);
  //   User_Device.hasOne(models.User);
  // }
  return User_Device; 
};