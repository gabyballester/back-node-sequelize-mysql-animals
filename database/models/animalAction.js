'use strict';

module.exports = (sequelize, DataTypes) => {

  const AnimalAction = sequelize.define('AnimalAction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    animalId: {
      allowNull: false,
      type: DataTypes.UUID
    },
    actionId: {
      allowNull: false,
      type: DataTypes.UUID
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

  AnimalAction.associate = (model) => {
    AnimalAction.hasMany(model.Action);
    AnimalAction.hasMany(model.Animal);
  }

  return AnimalAction;
};