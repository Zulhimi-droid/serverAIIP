const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const registerRouter = require('./component/register/register');
const loginRouter = require('./component/login/login');
const dashboardRouter = require('./component/dashboard/dashboard');
const databaseRouter = require('./component/database/database');
const imgprocessRouter = require('./component/img_process/img_process');

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
app.use('/dashboard', dashboardRouter);
app.use('/database', databaseRouter);
app.use('/img_process', imgprocessRouter);

app.listen(3030, () => {
  console.log('Server started on http://localhost:3030');
});