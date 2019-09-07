var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
//var server = require('../server'); // have to figure out later how this works
var server = 'http://localhost:8082';
var expect = chai.expect;
var should = chai.should;

chai.use(chaiHttp);

// test for get path
describe("function tests", function(){

  describe("greeting creation via get", function(){
      //happy path
      it('happy get path', function(done) {
       chai.request(server)
        .get('/api/v1/getHelloWorld')
        .query({person: 'world'}) //get straight forward result
        .end(function(err, res){
          //console.log(err);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          //console.log(res.body);
          var checkObj = {
            "greeting": "Hello world!",
            "language": "en-GB",
            "person": "world"
          };
          expect(res.body).to.be.eql(checkObj);
          done();
        });
      });

      // test for error if no result added
      it('get without specifing person in query error 422', function(done) {
       chai.request(server)
        .get('/api/v1/getHelloWorld')
        .query({person: ''})
        .end(function(err, res){

          expect(res).to.have.status(422);
          done();
        });
      });

      // test for error if no result added
      it('get without query error 422', function(done) {
       chai.request(server)
        .get('/api/v1/getHelloWorld')
        .query()
        .end(function(err, res){

          expect(res).to.have.status(422);
          done();
        });
      });

  });

  describe("greeting creation via webhook", function(){

    //happy path
    it('happy post path', function(done) {
     chai.request(server)
      .post('/api/v1/helloWorldHook')
      .send({
        "person": "world"
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type', 'text/json; charset=utf-8'); // this is requested as response
        expect(res.text).to.be.eql('{"status":"success","raw_output":[{"output_variable":"lang","output_value":"en-GB"},{"output_variable":"person","output_value":"world"}],"chatbot_response":"Hello world!"}'); // passes test
        done();
      });
    });

    //error due to missing input
    it('post with without person spec throws error 422', function(done) {
     chai.request(server)
      .post('/api/v1/helloWorldHook')
      .send({
        "person": ""
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(422);
        done();
      });
    });

    //error due to missing input
    it('post with without body spec throws error 422', function(done) {
     chai.request(server)
      .post('/api/v1/helloWorldHook')
      .send({
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(422);
        done();
      });
    });

  });
});
