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
    await queryInterface.createTable('animals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      organizationId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "organizations",
        //   key: "id"
        // },
        // onDelete: "RESTRICT",
        // onUpdate: "RESTRICT"
      },
      creatorId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id"
        // },
        // onDelete: "RESTRICT",
        // onUpdate: "RESTRICT"
      },
      updaterId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id"
        // },
        // onDelete: "RESTRICT",
        // onUpdate: "RESTRICT"
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      race: {
        type: Sequelize.STRING,
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: true
      },
      age: {
        type: Sequelize.STRING,
        allowNull: true
      },
      measure: {
        type: Sequelize.STRING,
        allowNull: true
      },
      healthStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sterilized: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      personality: {
        type: Sequelize.STRING,
        allowNull: true
      },
      statusId: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: "animalstatuses",
        //   key: "id"
        // },
        // onDelete: "RESTRICT",
        // onUpdate: "RESTRICT"
      },
      comments: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('animals');
  }
};