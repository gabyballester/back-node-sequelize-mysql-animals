'use strict';

/**
 * npx sequelize-cli db:seed:all
 * npx sequelize-cli db:seed:undo (last executed)
 * npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
 * npx sequelize-cli db:seed:undo:all
*/

const actionsArray = require("./data/actions-data");

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Actions', actionsArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Actions', null, {});
  }

};