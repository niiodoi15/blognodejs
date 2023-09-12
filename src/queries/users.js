const addUser = `
    INSERT INTO users(
    firstname,
    lastname,
    username,
    password
  )
  VALUES ($1,$2,$3,$4) RETURNING id, firstname, lastname, username, created_at
`;

const findUserByUsername = `
    SELECT id, firstname, lastname, password FROM users
 WHERE username=$1
`;

const getAllUsers = `
        SELECT * FROM users
`

module.exports = {
    addUser,
    findUserByUsername,
    getAllUsers
}