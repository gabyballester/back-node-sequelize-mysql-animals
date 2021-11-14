'use strict';

module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
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

  Role.associate = (model) => {
    Role.belongsTo(model.User, {
      foreignKey: "roleId",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });
  };

  return Role;
};