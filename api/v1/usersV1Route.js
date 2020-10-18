const express = require('express');
const UsersV1Service = require('../../services/UsersV1Service');
const createError = require('http-errors');
const httpStatus = require('http-status');
const {celebrate, Joi, Segments} = require('celebrate');

const router = express.Router();
/**
 * This File is responsible for running bussiness logic that is present in Services
 * Only Routes are aware of HTTP layer
 */

/**
 * GET /api/v1/users/
 * @query page - Page Number
 * @query pageSize - number of users per page
 */
router.get('/',
    celebrate({
        [Segments.QUERY]: {
            page: Joi.number().default(1),
            pageSize: Joi.number().default(10)
        }
    }),
    async (req, res, next) => {
        try {
            const {page, pageSize} = req.query;
            const users = await UsersV1Service.getUsers(page, pageSize);
            res.json(users);
        } catch (error) {
            console.error(error);
            next(createError(httpStatus.INTERNAL_SERVER_ERROR, "Error Fetching Users"))
        }
    })

/**
 * GET /api/v1/users/:id/friends
 * @param id - Id of User
 */
router.get('/:id/friends',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required().min(1),
        },
        [Segments.QUERY]: {
            page: Joi.number().default(1),
            pageSize: Joi.number().default(10)
        }
    }),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {page, pageSize} = req.query;
            const friends = await UsersV1Service.getUserFriends(id, page, pageSize);
            res.json(friends);
        } catch (error) {
            console.error(error);
            next(createError(httpStatus.INTERNAL_SERVER_ERROR, "Error fetching friends of this User"))
        }
    })

/**
 * GET /api/v1/users/:id/friend-of-friends
 * @param id - Id of User
 */
router.get('/:id/friend-of-friends',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required().min(1),
        },
        [Segments.QUERY]: {
            page: Joi.number().default(1),
            pageSize: Joi.number().default(10)
        }
    }),
    async (req, res, next) => {
        try {
            const {id} = req.params;
            const {page, pageSize} = req.query;
            const friends = await UsersV1Service.getFriendsOfFriends(id, page, pageSize);
            res.json(friends);
        } catch (error) {
            console.error(error);
            next(createError(httpStatus.INTERNAL_SERVER_ERROR, "Error Fetching Users"))
        }
    })

module.exports = router