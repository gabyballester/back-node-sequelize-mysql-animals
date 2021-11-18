'use strict';
module.exports = (sequelize, DataTypes) => {

  const Like = sequelize.define('Like', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      // references: {
      //   model: "Users",
      //   key: "id"
      // },
      // onDelete: "CASCADE",
      // onUpdate: "CASCADE"
    },
    postId: {
      allowNull: false,
      type: DataTypes.UUID,
      // references: {
      //   model: "Posts",
      //   key: "id"
      // },
      // onDelete: "CASCADE",
      // onUpdate: "CASCADE"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  })

  Like.associate = (model) => {

    Like.belongsTo(model.User, {
      foreignKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
    
    // Like.belongsTo(model.Post, {
    //   foreignKey: "id",
    //   onUpdate: "CASCADE",
    //   onDelete: "CASCADE"
    // });
  
  }

  return Like;
};