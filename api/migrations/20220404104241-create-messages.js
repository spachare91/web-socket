'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('messages', {
      messageid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4
      },
      convoid:{
        type : DataTypes.UUID,
        allowNull : false
      },
      senderId : {
        type : DataTypes.STRING,
        allowNull : false
      },
      message: {
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
    await queryInterface.dropTable('messages');
  }
};