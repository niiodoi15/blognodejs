const express = require('express');
const api = express.Router()
const users = require('../../routes/users')
// const books = require('../../routes/book')

api.get("/", (req, res) => res.status(200).json({
    status: 'success',
    message: 'Welcome to My Blog Post App API'
}))

api.use("/users", users);
// api.use("/books", books);


module.exports = api