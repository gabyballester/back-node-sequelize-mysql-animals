'use strict';

/**
 * npx sequelize-cli db:seed:all
 * npx sequelize-cli db:seed:undo (last executed)
 * npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
 * npx sequelize-cli db:seed:undo:all
*/

const animalStatusesArray = require("./data/roles-data");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('AnimalStatuses', animalStatusesArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AnimalStatuses', null, {});
  }
};
