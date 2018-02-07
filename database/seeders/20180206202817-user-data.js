'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Users', [{
        username: "booysenh",
        firstName: "Hennie",
        lastName: "Booysen",
        title: "Service Delivery Manager",
        email: "hennie.booysen@example.com",
        mobileNumber: "08312345678",
        officeNumber: "0211123344",
        presence: "Onsite",
        country: "South Africa",
        regions: "Western Regions",
        city: "Cape Town",
        campus: "N/A",
        building: "Standard Bank",
        floor: "6th Floor"
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete('Users', null, {});
  }
};