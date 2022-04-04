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
      conversationId: {
        type: DataTypes.UUID
      },
      senderId: {
        type: DataTypes.UUID
      },
      message: {
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
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('messages');
  }
};