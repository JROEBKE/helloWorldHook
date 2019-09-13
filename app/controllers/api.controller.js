const { validationResult } = require('express-validator');

module.exports = {
  getHelloWorld: getHelloWorld,
  helloWorldHook: helloWorldHook,
  helloWorld: helloWorld,
};

// general function to create greeting and exclude from accessing via get or hook
function helloWorld(req, callback) {

    // processing input and create variables
    var person= req.person;
    var language= 'en-GB'; // static variable for demonstration purposes

    // create greeting by processing input
    var greeting= "Hello "+person+"!"

    //create response as an object
    var response = {
      greeting: greeting,
      language: language,
      person: person,
    }
    console.log("processing done");
    callback(response);
    console.log(statusCode);
};


// simple get api which provides response in json
function getHelloWorld(req, res) {

  // validation error handling
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
    console.log(errors);
  }

  console.log(req.query);

  // call general function with provided input with nameless callback function to send results back
  helloWorld(req.query, function(response){
      res.send(response);
      console.log(response);
  });
};


//hook function which produces specially required output
function helloWorldHook(req, res) {

    // validation error handling
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      res.set('content-type', 'text/json');
      res.status(422);
      res.send({
        status: "error",
        message: "validation error",
        chatbot_response: "Sorry someting went wrong"
      });
    }

    console.log(req.body);

    // call request function with provided input with nameless callback function to send results back
    helloWorld(req.body, function(response){
      console.log("callback done");
      res.set('content-type', 'text/json');
      res.status(200);
      res.send({
        status: "success",
        raw_output: [
          {
            output_variable: "lang",
            output_value: response.language,
          },
          {
            output_variable: "person",
            output_value: response.person,
          }
        ],
       chatbot_response: response.greeting
      });
      console.log(response);
    });
};
