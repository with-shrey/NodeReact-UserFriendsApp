'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsToMany(models.User, {
                as: 'friends', through: 'UserFriend', foreignKey: "userId",
                otherKey: "friendId"
            });
            // define association here
        }
    };

    User.init({
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        avatar: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};