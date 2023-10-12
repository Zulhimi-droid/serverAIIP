  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const path = require('path');
  const registerRouter = require('./component/register/register');
  const loginRouter = require('./component/login/login');

  app.use(express.static('public/css'));
  app.use(express.static('public/img'));
  app.use(express.static('views'));
  
  // Middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: false }));

  // Register view
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => {
    res.render('login');
  });


  // Routes
  app.use('/register', registerRouter);
  app.use('/login', loginRouter);

  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });