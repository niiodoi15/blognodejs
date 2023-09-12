const {
    addUser,
    findUserByUsername,
    getAllUsers
} = require('../queries/users');

const { runQuery } = require('../config/database.config')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/env/index')

const createUser = async (body) => {
    const { firstname, lastname, username, password } = body
    // Check if user already exist in db
    const userExist = await runQuery(findUserByUsername, [username])
    if (userExist.length > 0) {
        throw {
            code: 409,
            message: 'User already exists',
            data: null,
            status: 'error'
        }
    }

    // Encrypt password
    const saltRounds = 12;
    const hash = bcrypt.hashSync(password, saltRounds);
    const response = await runQuery(addUser, [firstname, lastname, hash, username])

    return {
        code: 201,
        status: 'success',
        message: 'New user added successfully',
        data: response[0]
    }
}

const retrieveAllUsers = async () => {
    const data = await runQuery(getAllUsers);
    return {
        code: 200,
        status: 'success',
        message: 'Users fetched successfully',
        data
    }
}

const loginUser = async (body) => {
    const { username, password } = body;

    // Check if that user exists inside the db
    const user = await runQuery(findUserByUsername, [username]);
    if (user.length === 0) {
        throw {
            code: 404,
            status: 'error',
            message: 'User not found',
            data: null
        }
    }
    // Compare user passwords
    const { password: dbPassword, lastname, firstname, id } = user[0];
    console.log(user[0])
    const userPassword = bcrypt.compareSync(password, dbPassword); // Boolean true/false
    if (!userPassword) {
        throw {
            code: 400,
            status: 'error',
            message: 'Wrong username and password combination',
            data: null
        }
    }

    const options = {
        'expiresIn': '1d'
    }

    // Generate token for authentication purposes
    const token = jwt.sign({
        id,
        firstname,
        username,
        lastname
    }, config.JWT_SECRET_KEY, options);
    return {
        status: 'success',
        message: 'User login successfully',
        code: 200,
        data: {
            id,
            firstnamename,
            username,
            lastname,
            token
        }
    }
}

module.exports = {
    createUser,
    retrieveAllUsers,
    loginUser
}
