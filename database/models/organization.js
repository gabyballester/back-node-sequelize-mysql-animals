'use strict';

module.exports = (sequelize, DataTypes) => {

  const Organization = sequelize.define('Organization', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    code: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      unique: true,
      allowNull: false,
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

  Organization.associate = (model) => {
    Organization.belongsTo(model.User, {
      foreignKey: "organizationId",
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT"
    });

    Organization.hasOne(model.Animal, {
      foreignKey: 'organizationId',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    })

  };

  return Organization;
};