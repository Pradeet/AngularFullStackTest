'use strict';

import app from '../..';
import User from './user.model';
var user;
var should = require('should');
var expect =require('chai').expect;
var genUser = function() {
  user = new User({
    provider: 'local',
    id: '201301044',
    name: 'FakeUser13',
    email: '201301044@example.com',
    password: 'password'
  });
  return user;
};

describe('User Model', function() {
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


  describe('#id', function() {

    it('Should fail when saving with an blank Id', function () {
      user.id = " ";
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving with an null Id', function () {
      user.id = null;
      return expect(user.save()).should.be.rejected;
    });

    it('Should fail when saving without an Id', function () {
      user.id = undefined;
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when Id length is not equal to 9', function() {
      !user.id.should.be.length(9);
      return expect(user.save()).should.be.rejected;
    });

    it('should fail when Id contain characters', function() {
      user.id.should.not.match(/[a-z]/);
      return expect(user.save()).should.be.rejected;
    });

    it('should pass when Id contain numbers', function() {
      user.id.should.match(/[0-9]/);
      return expect(user.save()).should.be.true;
    });
  });


  describe('#name', function () {
    beforeEach(function () {
      return expect(user.save());
    });

    it('should report error when saving with an blank Name', function () {
      user.name = " ";
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


  describe('#email', function() {

    it('should fail when saving with a blank email', function() {
      user.email = " ";
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving with a null email', function() {
      user.email = null;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when saving without an email', function() {
      user.email = undefined;
      return expect(user.save()).to.be.rejected;
    });

    it('should fail when email format is not proper', function () {
      user.email.should.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
      return expect(user.save()).should.be.true;
    });
  });


  describe('#password', function() {

      it('should fail when saving with a blank password', function () {
        user.password = " ";
        return expect(user.save()).to.be.rejected;
      });

      it('should fail when saving with a null password', function () {
        user.password = null;
        return expect(user.save()).to.be.rejected;
      });

      it('should fail when saving without a password', function () {
        user.password = undefined;
        return expect(user.save()).to.be.rejected;
      });


      it('should authenticate user if valid', function () {
        expect(user.authenticate('password')).should.be.true;
      });

      it('should not authenticate user if invalid', function () {
        expect(user.authenticate('blah')).should.not.be.true;
      });

      it('should remain the same hash unless the password is updated', function () {
        user.name = 'Test User';
        return expect(user.save()
          .then(function (u) {
            return u.authenticate('password');
          })).should.be.true;
      });
    });
});
