'use strict';

module.exports = (sequelize, DataTypes) => {

  const Action = sequelize.define('Action', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });


  Action.associate = (model) => {

    Action.belongsToMany(model.Animal, {
      through: "animalAction",
      foreignKey: "actionId",
    });

  }



  return Action;
};