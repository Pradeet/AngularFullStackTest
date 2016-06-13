'use strict';

var app = require('../..');
import request from 'supertest';

var newCompanyEvent;

describe('CompanyEvent API:', function() {

  describe('GET /api/companyEvents', function() {
    var companyEvents;

    beforeEach(function(done) {
      request(app)
        .get('/api/companyEvents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companyEvents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(companyEvents).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/companyEvents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companyEvents')
        .send({
          name: 'New CompanyEvent',
          info: 'This is the brand new companyEvent!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompanyEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created companyEvent', function() {
      expect(newCompanyEvent.name).to.equal('New CompanyEvent');
      expect(newCompanyEvent.info).to.equal('This is the brand new companyEvent!!!');
    });

  });

  describe('GET /api/companyEvents/:id', function() {
    var companyEvent;

    beforeEach(function(done) {
      request(app)
        .get('/api/companyEvents/' + newCompanyEvent._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companyEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      companyEvent = {};
    });

    it('should respond with the requested companyEvent', function() {
      expect(companyEvent.name).to.equal('New CompanyEvent');
      expect(companyEvent.info).to.equal('This is the brand new companyEvent!!!');
    });

  });

  describe('PUT /api/companyEvents/:id', function() {
    var updatedCompanyEvent;

    beforeEach(function(done) {
      request(app)
        .put('/api/companyEvents/' + newCompanyEvent._id)
        .send({
          name: 'Updated CompanyEvent',
          info: 'This is the updated companyEvent!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompanyEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompanyEvent = {};
    });

    it('should respond with the updated companyEvent', function() {
      expect(updatedCompanyEvent.name).to.equal('Updated CompanyEvent');
      expect(updatedCompanyEvent.info).to.equal('This is the updated companyEvent!!!');
    });

  });

  describe('DELETE /api/companyEvents/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/companyEvents/' + newCompanyEvent._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when companyEvent does not exist', function(done) {
      request(app)
        .delete('/api/companyEvents/' + newCompanyEvent._id)
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
