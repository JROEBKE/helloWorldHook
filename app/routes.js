// create a new express router
const express      = require('express'),
  router           = express.Router(),
  viewController   = require('./controllers/view.controller'),
  apiController    = require('./controllers/api.controller'),
  { check }        = require('express-validator');

// export router
module.exports = router;

// show swagger spec
router.get('/swagger.json', viewController.swagger);


/*
define api routes
--------------------------------------------------------
 */
// swagger defintions
/**
// get hello world greeting
/**
 * @swagger
 * /api/v1/getHelloWorld:
 *   get:
 *     tags:
 *       - helloWorld
 *     description: Returns hello "person"
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: person
 *         description: person input
 *         in: "query"
 *         required: true
 *         type: string
 *         example: world
 *     responses:
 *       200:
 *         description: greeting result
 *       422:
 *         description: input validation error
 */
router.get('/api/v1/getHelloWorld',[
  check('person', 'You have to provide a peson name with at least one character').trim().escape().not().isEmpty().isLength({min: 1, max:100}).withMessage('Please not more than 100 characters')
  ], apiController.getHelloWorld);


/**
 * @swagger
* /api/v1/helloWorldHook:
*   post:
*     tags:
*       - helloWorld
*     description: Returns hello "person" in a specific format
*     produces:
*       - application/json
*     consumes:
*       - application/x-www-form-urlencoded
*     parameters:
*       - in: formData
*         name: person
*         required: true
*         type: string
*         example: world
*     responses:
*       200:
*        description: Ok
*        example: {"status": "success", "raw_output": [{"output_variable": "lang","output_value": "en-GB"},{"output_variable": "person","output_value": "world"}],"chatbot_response": "Hello world!"}
*       422:
*         description: input validation error
*         example: {"status": "error","message": "validation error","chatbot_response": "Sorry someting went wrong"}
*
*
*/
router.post('/api/v1/helloWorldHook',[
  check('person', 'You have to provide a peson name with at least one character').trim().escape().not().isEmpty().isLength({min: 1, max:100}).withMessage('Please not more than 100 characters')
  ], apiController.helloWorldHook);
