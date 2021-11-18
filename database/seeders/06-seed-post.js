'use strict';

/**
 * npx sequelize-cli db:seed:all
 * npx sequelize-cli db:seed:undo (last executed)
 * npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data
 * npx sequelize-cli db:seed:undo:all
*/

const postsArray = require("./data/posts-data");

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', postsArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }

};