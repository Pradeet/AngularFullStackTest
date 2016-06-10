'use strict';

var app = require('../..');
import request from 'supertest';

var newOfficer;

describe('Officer API:', function() {

  describe('GET /api/officer', function() {
    var officers;

    beforeEach(function(done) {
      request(app)
        .get('/api/officer')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          officers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(officers).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/officer', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/officer')
        .send({
          name: 'New Officer',
          info: 'This is the brand new officer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newOfficer = res.body;
          done();
        });
    });

    it('should respond with the newly created officer', function() {
      expect(newOfficer.name).to.equal('New Officer');
      expect(newOfficer.info).to.equal('This is the brand new officer!!!');
    });

  });

  describe('GET /api/officer/:id', function() {
    var officer;

    beforeEach(function(done) {
      request(app)
        .get('/api/officer/' + newOfficer._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          officer = res.body;
          done();
        });
    });

    afterEach(function() {
      officer = {};
    });

    it('should respond with the requested officer', function() {
      expect(officer.name).to.equal('New Officer');
      expect(officer.info).to.equal('This is the brand new officer!!!');
    });

  });

  describe('PUT /api/officer/:id', function() {
    var updatedOfficer;

    beforeEach(function(done) {
      request(app)
        .put('/api/officer/' + newOfficer._id)
        .send({
          name: 'Updated Officer',
          info: 'This is the updated officer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedOfficer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedOfficer = {};
    });

    it('should respond with the updated officer', function() {
      expect(updatedOfficer.name).to.equal('Updated Officer');
      expect(updatedOfficer.info).to.equal('This is the updated officer!!!');
    });

  });

  describe('DELETE /api/officer/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/officer/' + newOfficer._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when officer does not exist', function(done) {
      request(app)
        .delete('/api/officer/' + newOfficer._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
