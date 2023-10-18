const express = require('express');
const databaseRouter = express.Router();
const pool = require('../db/db');

databaseRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    // Check if the user is authenticated before rendering the dashboard
    if (req.session.user) {
        pool.query('SELECT * FROM test_grafana WHERE compliance_status = \'Yes\'', (err, result) => {
            if (!err) {
                res.render('database', { data: result.rows }); 
            } else {
                console.error('Error fetching user details:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login'); // Redirect to the login page if the user is not authenticated
    }
});

module.exports = databaseRouter;