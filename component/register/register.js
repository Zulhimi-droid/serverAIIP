const express = require('express');
const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import the UUID function

const registrationRouter = express.Router();

registrationRouter.get('/', (req, res) => {
  res.render('register');
});

registrationRouter.post('/form', async (req, res) => {
  const { first_name, last_name, age, address, email, password } = req.body;

  // Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the email already exists in the database
  const checkEmailQuery = 'SELECT email FROM user_details WHERE email = $1';
  const emailExists = await pool.query(checkEmailQuery, [email]);

  if (emailExists.rows.length > 0) {
    // Email already exists, show the error message
    res.redirect('/register?error=email-in-use');
  } else {
    // Generate a UUID for the user
    const userId = uuidv4();

    // Get the formatted timestamp
    const formattedTimestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');

    try {
      const insertQuery = `
        INSERT INTO user_details (id, first_name, last_name, age, address, email, password, first_register)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;
      const values = [userId, first_name, last_name, age, address, email, hashedPassword, formattedTimestamp];

      await pool.query(insertQuery, values);

      res.redirect('/register?success=true');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
});

module.exports = registrationRouter;
