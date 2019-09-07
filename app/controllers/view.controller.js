module.exports = {


  // swagger specification
  swagger: (req, res) => {

    // swagger definition
    var swaggerDefinition = {
      swagger: "2.0",
      info: {
        title: 'hello world hook',
        version: '1.0.0',
        description: 'sample app to provide response in a specific format',
        contact: {
          email: 'getintouchwithjonas@gmail.com'
        },
        license: 'MIT',
      },
      //host: 'localhost:8081',
      basePath: '/',

    };
    var options = {
      // import swaggerDefinitions
      swaggerDefinition: swaggerDefinition,
      // path to the API docs
      apis: ['./app/routes.js'],
    };
    var swaggerSpec = swaggerJSDoc(options);
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  }
};
