'use strict';


var forge = require('node-forge');

function decrypt(password, encryptedData) {
  var input = encryptedData;

  // parse salt from input
  input = forge.util.createBuffer(input, 'binary');
  // skip "Salted__" (if known to be present)
  input.getBytes('Salted__'.length);
  // read 8-byte salt
  var salt = input.getBytes(8);

  // Note: if using "-nosalt", skip above parsing and use
  // var salt = null;

  // 3DES key and IV sizes
  var keySize = 24;
  var ivSize = 8;

  var derivedBytes = forge.pbe.opensslDeriveBytes(
    password, salt, keySize + ivSize);
  var buffer = forge.util.createBuffer(derivedBytes);
  var key = buffer.getBytes(keySize);
  var iv = buffer.getBytes(ivSize);

  var decipher = forge.cipher.createDecipher('3DES-CBC', key);
  decipher.start({iv: iv});
  decipher.update(input);
  var result = decipher.finish(); // check 'result' for true/false

  return decipher.output.data;
}

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
		// }, {
		// hooks: {
		// 	afterFind: (users, options) => {
		// 		//check if the returned value is and array or not before unencrypting the returned values
		// 		if (Array.isArray(users)) {
		// 			users.forEach((user) => {
		// 				user.dataValues.username = decrypt('secretKey',user.dataValues.username);
		// 				user.dataValues.firstName = decrypt('secretKey',user.dataValues.firstName);
		// 				user.dataValues.lastName = decrypt('secretKey',user.dataValues.lastName);
		// 				user.dataValues.email = decrypt('secretKey',user.dataValues.email);
		// 				user.dataValues.mobileNumber = decrypt('secretKey',user.dataValues.mobileNumber);
		// 				user.dataValues.officeNumber = decrypt('secretKey',user.dataValues.officeNumber);
		// 			});
		// 		} else {
		// 			users.dataValues.username = decrypt('secretKey',users.dataValues.username);
		// 			users.dataValues.firstName = decrypt('secretKey',users.dataValues.firstName);
		// 			users.dataValues.lastName = decrypt('secretKey',users.dataValues.lastName);
		// 			users.dataValues.email = decrypt('secretKey',users.dataValues.email);
		// 			users.dataValues.mobileNumber = decrypt('secretKey',users.dataValues.mobileNumber);
		// 			users.dataValues.officeNumber = decrypt('secretKey',users.dataValues.officeNumber);
		// 		}
		// 		// console.log(users);
		// 	}
		//}
	}
);

  User.associate = function (models) {
  	User.belongsToMany(models.Device, { 
  		through: 'user_devices',
  		as: 'Devices',
  		foreignKey: 'userId',
  		onDelete: 'cascade',
  		hooks: true
  	});
  }

  // Alternative to add hooks which if more readable and modular
  User.hook('afterFind', (users) => {
  	if (Array.isArray(users)) {
		users.forEach((user) => {
			user.dataValues.username = decrypt('secretKey',user.dataValues.username);
			user.dataValues.firstName = decrypt('secretKey',user.dataValues.firstName);
			user.dataValues.lastName = decrypt('secretKey',user.dataValues.lastName);
			user.dataValues.email = decrypt('secretKey',user.dataValues.email);
			user.dataValues.mobileNumber = decrypt('secretKey',user.dataValues.mobileNumber);
			user.dataValues.officeNumber = decrypt('secretKey',user.dataValues.officeNumber);
		});
	} else {
		users.dataValues.username = decrypt('secretKey',users.dataValues.username);
		users.dataValues.firstName = decrypt('secretKey',users.dataValues.firstName);
		users.dataValues.lastName = decrypt('secretKey',users.dataValues.lastName);
		users.dataValues.email = decrypt('secretKey',users.dataValues.email);
		users.dataValues.mobileNumber = decrypt('secretKey',users.dataValues.mobileNumber);
		users.dataValues.officeNumber = decrypt('secretKey',users.dataValues.officeNumber);
	}
  });

  return User;
};