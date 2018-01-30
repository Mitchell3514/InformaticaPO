// express
const express = require('express');
const app = express();

// set port
const port = process.env.PORT || 8080;

// middleware
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const flash = require('express-flash'); //not rly middleware
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev')); // Middleware for logging to console
app.use(cookieParser()); // Middleware for cookie parsing (request.cookie)
app.use(bodyParser.urlencoded({ // Get information from html body
  extended: false
}));
app.use(bodyParser.json())
app.use(session({
  secret: 'suchsecretstring', // secret/keycode for cookie
  saveUninitialized: true, // Saves session to database (server outage)
  resave: true // nothing changed, still save (rip storage)
}));
app.use(flash());

app.set('view engine', 'pug') // render pug(jade) -> html

const router = express.Router();

require('./config/routes/routes.js')(app);

app.listen(port);
console.log('Server running on port:' + port);
