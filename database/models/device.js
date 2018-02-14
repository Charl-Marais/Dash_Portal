'use strict';
module.exports = (sequelize, DataTypes) => {
  var Device = sequelize.define('Device', {
    serial: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING
  });

  Device.associate = function(models) {
  	Device.hasMany(models.Application, {
  		foreignKey: 'deviceId',
  		onDelete: 'CASCADE'
  	});
    Device.belongsToMany(models.User, { 
      through: 'user_devices',
      as: 'Users',
      foreignKey: 'deviceId'
    }); 
  }

  return Device;
};