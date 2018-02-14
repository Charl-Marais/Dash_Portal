'use strict';
module.exports = (sequelize, DataTypes) => {
  var Application = sequelize.define('Application', {
    name: DataTypes.STRING,
    vendor: DataTypes.STRING,
    licence: DataTypes.STRING,
    deviceId: DataTypes.INTEGER
  });

  Application.associate = function(models) {
  	Application.belongsTo(models.Device);
  }

  return Application;
}; 