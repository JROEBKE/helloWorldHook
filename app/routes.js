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
*       - text/json
*     consumes:
*       - application/json
*     parameters:
*       - name: data
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/Data'
*     responses:
*       200:
*         description: greeting response
*
*/
router.post('/api/v1/helloWorldHook',[
  check('person', 'You have to provide a peson name with at least one character').trim().escape().not().isEmpty().isLength({min: 1, max:100}).withMessage('Please not more than 100 characters')
  ], apiController.helloWorldHook);

/**
* @swagger
*  definitions:
*   Data:
*     type: object
*     required:
*       - person
*     properties:
*       person:
*         description: provide person
*         type: string
*         example: world
*/
