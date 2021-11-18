'use strict';

/**
 * Create Migration -> npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
 * Migrate 1 -> npx sequelize-cli db:migrate --to XXXXXXXXXXXXXX-action-model.js
 * Revert 1 -> npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-action-model.js
 * Migrate all -> npx sequelize-cli db:migrate:all
 * Revert migrate all -> npx sequelize-cli db:migrate:undo:all
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('organizations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('organizations');
  }
};