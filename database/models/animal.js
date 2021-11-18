'use strict';
import { uuid } from "../../api/services/uuid.service";

module.exports = (sequelize, DataTypes) => {

  const Animal = sequelize.define('Animal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    code: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "organizations",
      //   key: "id"
      // },
      // onDelete: "RESTRICT",
      // onUpdate: "RESTRICT"
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id"
      // },
      // onDelete: "RESTRICT",
      // onUpdate: "RESTRICT"
    },
    updaterId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "Users",
      //   key: "id"
      // },
      // onDelete: "RESTRICT",
      // onUpdate: "RESTRICT"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    race: {
      type: DataTypes.STRING,
      allowNull: true
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.ENUM({
        values: ['small', 'avg', 'big']
      })
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.ENUM({
        values: ['male', 'female']
      })
    },
    age: {
      type: DataTypes.STRING,
      allowNull: true
    },
    measure: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.ENUM({
        values: ['year', 'month']
      })
    },
    healthStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sterilized: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    personality: {
      type: DataTypes.STRING,
      allowNull: true
    },
    statusId: {
      type: DataTypes.UUID,
      allowNull: false,
      // references: {
      //   model: "animalstatuses",
      //   key: "id"
      // },
      // onDelete: "RESTRICT",
      // onUpdate: "RESTRICT"
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true
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

  Animal.associate = (model) => {

    Animal.belongsTo(model.AnimalStatus, {
      foreignKey: 'statusId',
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    });

    Animal.belongsTo(model.Organization, {
      foreignKey: 'organizationId',
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    })
    Animal.belongsTo(model.User, {
      foreignKey: 'creatorId',
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    })

    Animal.belongsToMany(model.Action, {
      through: "animalAction",
      foreignKey: "animalId",
    });

  };

  return Animal;
};