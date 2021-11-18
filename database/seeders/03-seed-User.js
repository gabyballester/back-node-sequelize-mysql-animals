'use strict';
const usersArray = require('./data/users-data');
/**
 * npx sequelize-cli db:seed:all
 * npx sequelize-cli db:seed:undo (last executed)
 * npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
 * npx sequelize-cli db:seed:undo:all
*/

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', usersArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
