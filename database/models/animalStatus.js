'use strict';
import { uuid } from "../../api/services/uuid.service";

module.exports = (sequelize, DataTypes) => {

  const AnimalStatus = sequelize.define('AnimalStatus', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.ENUM({
        values: ['sponsor', 'embrace', 'adopt']
      })
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      //   references: {
      //     model: "Users",
      //     key: "id"
      //   },
      //   onDelete: "RESTRICT",
      //   onUpdate: "RESTRICT"
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

  AnimalStatus.associate = (model) => {
    AnimalStatus.hasMany(model.Animal);
  }

  return AnimalStatus;
};