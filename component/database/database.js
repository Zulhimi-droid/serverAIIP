const express = require('express');
const databaseRouter = express.Router();
const pool = require('../db/db');

databaseRouter.get('/', (req, res) => {
    pool.query('SELECT * FROM user_details', (err, result) => {
        if (!err) {
            res.render('database', { data: result.rows }); 
        } else {
            console.error('Error fetching user details:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });  
});

module.exports = databaseRouter;