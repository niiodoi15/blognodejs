const UserService = require('../services/users.services')

/**
 * Controller creating a new user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns JSON object as response data
 */

const createUsers = async (req, res, next) => {
    try {
        const response = await UserService.createUser(req.body);
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}


const fetchAllUsers = async (req, res, next) => {
    try {
        const result = await UserService.retrieveAllUsers();
        return res.status(result.code).json(result)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createUsers,
    fetchAllUsers
}