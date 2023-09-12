const express = require('express');
const router = express.Router()
const {
    createUsers,
    // signInUser,
    fetchAllUsers,
    // fetchSingleUser,
    // updateUsers
} = require('../controllers/users.controller')

router.post('/signup', createUsers);
// router.post('/login', signInUser);
router.get('/', fetchAllUsers);
// router.get('/:id', fetchSingleUser);
// router.put('/:id', updateUsers);
// router.delete('/:id', deleteUser);

module.exports = router;