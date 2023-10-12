const express = require('express');
const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res) => {
    res.set('Cache-Control', 'no-store, must-revalidate');
    
    // Check if the user is authenticated before rendering the dashboard
    if (req.session.user) {
        res.render('dashboard');
    } else {
        res.redirect('/login'); // Redirect to the login page if the user is not authenticated
    }
});

module.exports = dashboardRouter;