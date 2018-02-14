'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
  	username: DataTypes.STRING,
	firstName: DataTypes.STRING,
	lastName: DataTypes.STRING,
	title: DataTypes.STRING,
	email: DataTypes.STRING,
	mobileNumber: DataTypes.STRING,
	officeNumber: DataTypes.STRING,
	presence: DataTypes.STRING,
	country: DataTypes.STRING,
	regions: DataTypes.STRING,
	city: DataTypes.STRING,
	campus: DataTypes.STRING,
	building: DataTypes.STRING,
	floor: DataTypes.STRING
  });

  User.associate = function (models) {
  	User.belongsToMany(models.Device, { 
  		through: 'user_devices', 
  		as: 'Devices',
  		foreignKey: 'userId'
  	});
  }
	
  return User;
};