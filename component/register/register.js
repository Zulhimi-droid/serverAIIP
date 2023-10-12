const express = require('express');
const pool = require('../db/db'); // Import your pool configuration from db.js
const bcrypt = require('bcrypt');

const registrationRouter = express.Router();

registrationRouter.get('/', (req, res) => {
  res.render('register');
});

// Handle the POST request for user registration
registrationRouter.post('/form', async (req, res) => {
  const { first_name, last_name, age, address, email, password } = req.body;

  // Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // Get the formatted timestamp
  const formattedTimestamp = new Date().toISOString().slice(0, 16).replace("T", " ");

  try {
    const query = `
      INSERT INTO user_details (first_name, last_name, age, address, email, password, first_register)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [first_name, last_name, age, address, email, hashedPassword, formattedTimestamp];

    await pool.query(query, values);

    res.redirect('/register?success=true');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = registrationRouter;
