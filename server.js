// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const express      = require('express');
const app          = express();
const path         = require('path');
const port         = process.env.PORT;

const router = express.Router();
const ejs = require('ejs');

app.set('view engine','ejs');
app.set('views', path.join(__dirname, './views'));

// serves up static files from the public folder. Anything in public/ will just
// be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
  res.render('index');
});

// apply the routes to our application
app.use('/', router);

app.listen(port);
