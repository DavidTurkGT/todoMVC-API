const express     = require('express');
const bodyParser  = require('body-parser');
const validator   = require('express-validator');
const morgan      = require('morgan');
const path        = require('path');
const routes      = require('./routes');

const app = express();
////////////////////////////////////////////////////////////////////////////////
app.use( bodyParser.urlencoded( {extended: true} ) );
app.use( bodyParser.json() );
app.use( validator() );

app.use( morgan('dev') );

app.set('port', (process.env.PORT) || 3000);
////////////////////////////////////////////////////////////////////////////////
app.use(routes);

app.listen(app.get('port'), (req, res) =>
  console.log("App listening on port ", app.get('port)') ) );
////////////////////////////////////////////////////////////////////////////////
