'use strict';

import app from '../..';
import User from './company.model';
var user;
var should = require('should');
var expect =require('chai').expect;
var genUser = function() {
  user = new User({
    provider: 'local',
    name: 'CompanyUser14',
    website: 'www.example.com',
    companyProfile: '',
    addressLine1:'' ,
    city: 'gandhinagar',
    state: 'gujarat',
    PostalCode: '382007',
    contactNumber: '9825155055'
  });
  return user;
};

describe('Company Model', function() {
  before(function() {
    // Clear users before testing
    return User.remove();
  });

  beforeEach(function() {
    genUser();
  });

  afterEach(function() {
    return User.remove();
  });

  it('should begin with no users', function() {
    //return expect(User.find({}).exec()).to.be.lengthOf(0); Todo : Fix the assertion array length
  });
//
  it('should fail when saving a duplicate user', function() {
    return expect(user.save()
      .then(function() {
        var userDup = genUser();
        return userDup.save();
      })).to.be.rejected;
  });


  describe('#name', function () {
    beforeEach(function () {
      return expect(user.save());
    });

    it('should report error when saving with an blank Name', function () {
      user.name = ' ';
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving with an Null Name', function () {
      user.name = null;
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving without an Name', function () {
      user.name = undefined;
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when field contains only digit or character', function () {
      !user.name.should.match(/^[a-zA-Z0-9]+$/);
      return expect(user.save()).should.be.rejected;
    });

  });

  describe('#website', function () {
    beforeEach(function () {
      return expect(user.save());
    });

    it('should report error when saving with an blank website Name', function () {
      user.website = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving with an Null website Name', function () {
      user.website = null;
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving without an website Name', function () {
      user.website = undefined;
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when website name is not properly define', function () {
      user.website.should.match(/^(((ht|f){1}(tp:[/][/]){1})|((www.){1}))[-a-zA-Z0-9@:%_\+.~#?&//=]+$/);
      return expect(user.save()).should.be.true;
    });
  });

  describe('#companyProfile', function () {
    beforeEach(function () {
      return expect(user.save());
    });

    it('should report error when saving with an blank company profile', function () {
      user.companyProfile = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving with an Null company profile', function () {
      user.companyProfile = null;
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving without an company profile', function () {
      user.companyProfile = undefined;
      return expect(user.save()).should.be.rejected;
    });
  });

  describe('#addressLine1', function () {
    beforeEach(function () {
      return expect(user.save());
    });

    it('should report error when saving with an blank address', function () {
      user.addressLine1 = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving with an Null address', function () {
      user.addressLine1 = null;
      return expect(user.save()).should.be.rejected;
    });

    it('should report error when saving without an address', function () {
      user.addressLine1 = undefined;
      return expect(user.save()).should.be.rejected;
    });
  });

  describe('#city', function() {

    it('should fail when saving with a blank city', function() {
      user.city = " ";
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null city', function() {
      user.city = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without an city', function() {
      user.city = undefined;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when city format is not proper', function () {
      user.city.should.match(/[a-zA-Z]/);
      return expect(user.save()).should.be.true;
    });
  });

  describe('#state', function() {

    it('should fail when saving with a blank state', function() {
      user.state = " ";
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null state', function() {
      user.state = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without an state', function() {
      user.state = undefined;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when state format is not proper', function () {
      user.state.should.match(/[a-zA-Z]/);
      return expect(user.save()).should.be.true;
    });
  });

  describe('#Postal code', function() {

    it('Should fail when saving with an blank postal code', function () {
      user.PostalCode = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving with an null postal code', function () {
      user.PostalCode = null;
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving without an postal code', function () {
      user.PostalCode = undefined;
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when postal code length is not equal to 6', function() {
      !user.PostalCode.should.be.length(6);
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when postal code contain characters', function() {
      user.PostalCode.should.not.match(/[a-zA-Z]/);
      return expect(user.save()).should.be.rejected;
    });

    it('should pass when postal code contain numbers', function() {
      user.PostalCode.should.match(/[0-9]/);
      return expect(user.save()).should.be.true;
    });
  });

  describe('#Contact Number', function() {
    it('Should fail when saving with an blank contact number', function () {
      user.contactNumber = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving with an null contact number', function () {
      user.contactNumber = null;
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving without an contact number', function () {
      user.contactNumber = undefined;
      return expect(user.save()).should.be.rejected;
    });


    it('should fail when contact number contain characters', function() {
      user.contactNumber.should.not.match(/[a-zA-Z]/);
      return expect(user.save()).should.be.rejected;
    });

    it('should pass when contact number contain numbers', function() {
      user.contactNumber.should.match(/[0-9]/);
      return expect(user.save()).should.be.true;
    });
  });

});
