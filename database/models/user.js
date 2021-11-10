'use strict';
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
    role: {
      type: DataTypes.STRING,
      enum: ['user', 'editor', 'admin', 'suadmin'],
      allowNull: false,
      defaultValue: 'user',
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    hash:
    {
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

  // User.associate = (model) => {
  //   User.hasMany(model.Like, { as: "usuario", foreignKey: "userId" });
  //   User.hasMany(model.Post, { as: "post", foreignKey: "userId" });
  // };

  return User;
};

