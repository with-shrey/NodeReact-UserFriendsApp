"use strict"
const {User, sequelize} = require('../models');
const {QueryTypes} = require('sequelize');
const convertPageToLimitOffset = require('../utilities/convertPageToLimitOffset')

/**
 * This file is responsible for interacting with Database Repositories (ORM in this case)
 * & Keeping all business logic
 * None of the HTTP req, res should be present in this layer
 */


/**
 * Find All Users
 * @param page - No Of Page
 * @param pageSize - Number of Users to show
 * @returns {Promise<User>}
 */
function getUsers(page, pageSize) {
    const {limit, offset} = convertPageToLimitOffset(page, pageSize)
    return User.findAll({
        limit,
        offset
    })
}

/**
 * Find All Friends of user
 * @param userId - UserId
 * @param page
 * @param pageSize
 * @returns {Promise<User>}
 */
async function getUserFriends(userId, page, pageSize) {
    const {limit, offset} = convertPageToLimitOffset(page, pageSize)
    const user = await User.findOne({
        where: {
            id: userId
        },
    });
    return user.getFriends({
        joinTableAttributes: [],
        limit,
        offset
    });
}

/**
 * Find Friends of Friend for a user
 * @param userId
 * @param page
 * @param pageSize
 * @returns {Promise<User>}
 */
async function getFriendsOfFriends(userId, page, pageSize) {
    const {limit, offset} = convertPageToLimitOffset(page, pageSize)
    const users = await sequelize.query(
        `select users.* from 
        UserFriends userFriend 
        LEFT JOIN UserFriends friends ON userFriend.friendId = friends.userId  
        LEFT JOIN Users users ON users.id=friends.friendId 
        where userFriend.userId=${userId} AND friends.friendId !=${userId}
        LIMIT ${limit}
        OFFSET ${offset}
        `, {
            type: QueryTypes.SELECT,
        });
    return users
}

module.exports = {
    getUsers,
    getUserFriends,
    getFriendsOfFriends,
}