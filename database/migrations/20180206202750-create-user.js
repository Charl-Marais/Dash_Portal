'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: { 
        type: Sequelize.STRING 
      },
      firstName: { 
        type: Sequelize.STRING,
        validate: {
          is: ["^[a-z]+$",'i']
        } 
      },
      lastName: {  
        type: Sequelize.STRING,
        validate: {
          is: ["^[a-z]+$",'i']
        } 
      },
      title: { 
        type: Sequelize.STRING 
      },
      email: {  
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      mobileNumber: { 
        type: Sequelize.STRING 
      },
      officeNumber: { 
        type: Sequelize.STRING 
      },
      presence: { 
        type: Sequelize.STRING 
      },
      country: { 
        type: Sequelize.STRING 
      },
      regions: { 
        type: Sequelize.STRING 
      },
      city: { 
        type: Sequelize.STRING 
      },
      campus: { 
        type: Sequelize.STRING 
      },
      building: { 
        type: Sequelize.STRING 
      },
      floor: { 
        type: Sequelize.STRING 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};


