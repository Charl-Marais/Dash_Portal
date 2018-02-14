'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asset = sequelize.define('Asset', {
    hostName: DataTypes.STRING,
    deviceId: DataTypes.INTEGER
  }); 

  Asset.associate = function(models) {
    Asset.belongsTo(models.Device);
  }

  return Asset;
}; 