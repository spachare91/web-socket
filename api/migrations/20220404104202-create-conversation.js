'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('conversations', {
      convoid: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4
      },
      member:{
        type : DataTypes.UUID,
        allowNull : false
      }, 
      role : {
        type : DataTypes.STRING,
        allowNull : false
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
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('conversations');
  }
};