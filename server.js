// load environment variables
require('dotenv').config();

// grab dependencies
const express    = require('express');
  app            = express();
  argv           = require('minimist')(process.argv.slice(2));
  helmet         = require('helmet'); //security validator
  swaggerJSDoc   = require('swagger-jsdoc'); //swagger API doc
  basicAuth      = require('express-basic-auth');
  bodyParser     = require('body-parser');
// configure our application ===================

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'));

/*/ activate basicAuth by fetching first username  & password from  env file and then check input vs. data
const Password =  process.env.PASSWORD;
const User =  process.env.USER;
app.use(basicAuth({ authorizer: myAuthorizer, challenge: true } ))
function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, User)
    const passwordMatches = basicAuth.safeCompare(password, Password)
    return userMatches & passwordMatches
}
*/
//helmet security
app.use(helmet())

//body encoding
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set var port = 8080 as default;
var   port = process.env.PORT || 8080;
if(argv.port !== undefined)
    port = argv.port;
else
    console.log('No --port=xxx specified, taking default port ' + port + '.')

//Set var domain = localhost as default;
var domain =  process.env.DOMAIN || 'localhost';
if(argv.domain !== undefined)
    domain = argv.domain;
else
    console.log('No --domain=xxx specified, taking default hostname "localhost".')

// Set and display the application URL
var applicationUrl = 'http://' + domain + ':' + port;
  console.log('server running on ' + applicationUrl);

// set the routes =============================
app.use(require('./app/routes'));

// start our server ===========================
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
