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
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        enum: ['user', 'editor', 'admin', 'suadmin'],
        allowNull: false,
        defaultValue: 'user',
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      hash:
      {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('users');
  }
};