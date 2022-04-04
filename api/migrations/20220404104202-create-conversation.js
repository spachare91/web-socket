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
      members: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
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