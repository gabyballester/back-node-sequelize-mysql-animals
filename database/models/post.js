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
    Post.belongsTo(model.User, { foreignKey: "id" });
    Post.hasMany(model.Like, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }

  return Post;
};