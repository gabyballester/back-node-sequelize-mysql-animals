'use strict';
// const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  const Post = sequelize.define('Post', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    text: {
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
  })

  Post.associate = (model) => {

    Post.belongsToMany(model.User, {
      through: 'like',
      foreignKey: "id",
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Post.belongsToMany(model.Like,{});

  }

  return Post;
};