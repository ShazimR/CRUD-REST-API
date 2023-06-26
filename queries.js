require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});


// GET all users
const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
};

// GET a single user
const getUserbyID = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
};

// POST new user
const createUser = (req, res) => {
    const { name, email } = req.body;
    
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) throw error;
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
};

// PUT updated data into existing user
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    pool.query('UPDATE users SET name=$1, email=$2 WHERE id=$3', [name, email, id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`User modified with ID: ${id}`);
    })
};

// DELETE a user
const deleteUser = (req, res) => {
    const id = req.params.id;

    pool.query('DELETE FROM users WHERE id=$1', [id], (error, results) => {
        if (error) throw error;
        res.status(200).send(`User deleted with ID: ${id}`);
    })
};

// DELETE all users
const deleteAllUsers = (req, res) => {
    pool.query('DELETE FROM users', (error, results) => {
        if (error) throw error;
        res.status(200).send('All users deleted');
    })
};


module.exports = {
    getUsers,
    getUserbyID,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
}
