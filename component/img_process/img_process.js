const express = require('express');
const imgprocessRouter = express.Router();
const pool = require('../db/db');

imgprocessRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');

    // Check if the user is authenticated before rendering the dashboard
    if (req.session.user) {
        pool.query('SELECT * FROM test_grafana WHERE compliance_status = \'No\'', (err, result) => {
            if (!err) {
                res.render('img_process', { data: result.rows });
            } else {
                console.error('Error executing SQL query:', err);
                console.error(err.stack);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.redirect('/login');
    }
});

// Add a new route to handle the database update based on compliance_status
imgprocessRouter.post('/update', (req, res) => {
    if (req.session.user) {
        const recordComplianceStatus = 'No'; // Assuming records to be updated have "No" compliance_status

        // Update the compliance_status in the database for records with "No"
        pool.query('UPDATE test_grafana SET compliance_status = \'Yes\' WHERE compliance_status = $1', [recordComplianceStatus], (err, result) => {
            if (!err) {
                res.status(200).json({ message: 'Records updated successfully' });
            } else {
                console.error('Error updating records:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

module.exports = imgprocessRouter;