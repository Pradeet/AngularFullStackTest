'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var companyOfficialCtrlStub = {
  index: 'companyOfficialCtrl.index',
  show: 'companyOfficialCtrl.show',
  create: 'companyOfficialCtrl.create',
  update: 'companyOfficialCtrl.update',
  destroy: 'companyOfficialCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var companyOfficialIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './companyOfficial.controller': companyOfficialCtrlStub
});

describe('CompanyOfficial API Router:', function() {

  it('should return an express router instance', function() {
    expect(companyOfficialIndex).to.equal(routerStub);
  });

  describe('GET /api/companyOfficials', function() {

    it('should route to companyOfficial.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'companyOfficialCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/companyOfficials/:id', function() {

    it('should route to companyOfficial.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'companyOfficialCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/companyOfficials', function() {

    it('should route to companyOfficial.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'companyOfficialCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/companyOfficials/:id', function() {

    it('should route to companyOfficial.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'companyOfficialCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/companyOfficials/:id', function() {

    it('should route to companyOfficial.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'companyOfficialCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/companyOfficials/:id', function() {

    it('should route to companyOfficial.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'companyOfficialCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
