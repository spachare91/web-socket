'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Conversation,{foreignKey:'convoid'})
    }
  }
  Messages.init({
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
    }
  }, {
    sequelize,
    modelName: 'Messages',
    tableName:'messages'
  });
  return Messages;
};