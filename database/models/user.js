'use strict';
import { uuid } from "../../api/services/uuid.service";

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '00',
      references: {
        model: "Roles",
        key: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Organizations",
        key: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: true,
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

  User.associate = (model) => {
    User.hasMany(model.Like, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasMany(model.Post, {
      foreignKey: 'postId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    User.hasOne(model.Organization, {
      foreignKey: 'organizationId',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    User.hasOne(model.Role, {
      foreignKey: 'roleId',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    User.hasOne(model.Animal, {
      foreignKey: 'creatorId',
      onUpdate: 'RETRICT',
      onDelete: 'RETRICT'
    })
  };

  return User;
};