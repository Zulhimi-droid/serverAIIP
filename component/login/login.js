const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../db/db'); // Import your pool configuration from db.js

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Get the formatted timestamp
  const formattedTimestamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  try {
    // Query the database to find the user by email
    const query = 'SELECT * FROM user_details WHERE email = $1';
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      return res.status(401).send('Invalid email');
    }

    const user = rows[0];

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send('Invalid password');
    }

    // Update the last_login field in the database with the formatted timestamp
    const updateLastLoginQuery = 'UPDATE user_details SET last_login = $1 WHERE email = $2';
    await pool.query(updateLastLoginQuery, [formattedTimestamp, email]);

    // Authentication successful, set session
    req.session.user = user;
    res.send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = loginRouter;
