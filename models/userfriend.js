'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserFriend extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    UserFriend.init({
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        friendId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // name of Target model
                key: 'id', // key in Target model that we're referencing
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
    }, {
        sequelize,
        modelName: 'UserFriend',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'friendId']
            },
        ]
    });
    return UserFriend;
};