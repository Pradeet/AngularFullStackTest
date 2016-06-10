'use strict';

var app = require('../..');
import request from 'supertest';

var newCompanyOfficial;

describe('CompanyOfficial API:', function() {

  describe('GET /api/companyOfficials', function() {
    var companyOfficials;

    beforeEach(function(done) {
      request(app)
        .get('/api/companyOfficials')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companyOfficials = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(companyOfficials).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/companyOfficials', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/companyOfficials')
        .send({
          name: 'New CompanyOfficial',
          info: 'This is the brand new companyOfficial!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCompanyOfficial = res.body;
          done();
        });
    });

    it('should respond with the newly created companyOfficial', function() {
      expect(newCompanyOfficial.name).to.equal('New CompanyOfficial');
      expect(newCompanyOfficial.info).to.equal('This is the brand new companyOfficial!!!');
    });

  });

  describe('GET /api/companyOfficials/:id', function() {
    var companyOfficial;

    beforeEach(function(done) {
      request(app)
        .get('/api/companyOfficials/' + newCompanyOfficial._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          companyOfficial = res.body;
          done();
        });
    });

    afterEach(function() {
      companyOfficial = {};
    });

    it('should respond with the requested companyOfficial', function() {
      expect(companyOfficial.name).to.equal('New CompanyOfficial');
      expect(companyOfficial.info).to.equal('This is the brand new companyOfficial!!!');
    });

  });

  describe('PUT /api/companyOfficials/:id', function() {
    var updatedCompanyOfficial;

    beforeEach(function(done) {
      request(app)
        .put('/api/companyOfficials/' + newCompanyOfficial._id)
        .send({
          name: 'Updated CompanyOfficial',
          info: 'This is the updated companyOfficial!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCompanyOfficial = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCompanyOfficial = {};
    });

    it('should respond with the updated companyOfficial', function() {
      expect(updatedCompanyOfficial.name).to.equal('Updated CompanyOfficial');
      expect(updatedCompanyOfficial.info).to.equal('This is the updated companyOfficial!!!');
    });

  });

  describe('DELETE /api/companyOfficials/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/companyOfficials/' + newCompanyOfficial._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when companyOfficial does not exist', function(done) {
      request(app)
        .delete('/api/companyOfficials/' + newCompanyOfficial._id)
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
