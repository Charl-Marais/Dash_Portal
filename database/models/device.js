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
  var Device = sequelize.define('Device', {
    serial: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING
  },{
    hooks: {
      afterFind: (devices) => {
        if (Array.isArray(devices)) {
          devices.forEach((device) => {
            device.dataValues.serial = decrypt('secretKey',device.dataValues.serial);
          });
        } else {
          devices.dataValues.serial = decrypt('secretKey',devices.dataValues.serial);
        }
      }
    }
  });

  Device.associate = function (models) {
  	Device.hasMany(models.Application, {
  		foreignKey: 'deviceId',
      hooks: true
  	});
    Device.belongsToMany(models.User, { 
      through: 'user_devices',
      as: 'Users',
      foreignKey: 'deviceId',
      onDelete: 'cascade',
      hooks: true
    }); 
  }

  // Alternative to add hooks which if more readable and modular
  // Device.hook('afterFind', (devices) => {
  //   if (Array.isArray(devices)) {
  //     devices.forEach((device) => {
  //       device.dataValues.serial = decrypt('secretKey',device.dataValues.serial);
  //     });
  //   } else {
  //     devices.dataValues.serial = decrypt('secretKey',devices.dataValues.serial);
  //   }
  // });

  return Device;
};