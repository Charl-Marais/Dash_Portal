const Sequelize = require("sequelize");

module.exports = { 
  "development": {
    "username": "ssluser",
    "password": "sslpassword",
    "database": "itdash-dev",
    "host": "127.0.0.1",
    "ssl": true,
    "dialect": "mysql",
    "dialectOptions": {
      "ssl": true
    },
    "operatorsAliases": Sequelize.Op,
    "pool": {
      "max": 30,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "test": {
    "username": "itdashtest",
    "password": "itdashtest",
    "database": "itdash-test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "pool": {
      "max": 30,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  },
  "production": {
    "username": "itdashadmin",
    "password": "itdashadmin",
    "database": "itdash",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "pool": {
      "max": 30,
      "min": 0,
      "acquire": 30000,
      "idle": 10000
    }
  }
}
