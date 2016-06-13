'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var companyEventCtrlStub = {
  index: 'companyEventCtrl.index',
  show: 'companyEventCtrl.show',
  create: 'companyEventCtrl.create',
  update: 'companyEventCtrl.update',
  destroy: 'companyEventCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var companyEventIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './companyEvent.controller': companyEventCtrlStub
});

describe('CompanyEvent API Router:', function() {

  it('should return an express router instance', function() {
    expect(companyEventIndex).to.equal(routerStub);
  });

  describe('GET /api/companyEvents', function() {

    it('should route to companyEvent.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'companyEventCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/companyEvents/:id', function() {

    it('should route to companyEvent.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'companyEventCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/companyEvents', function() {

    it('should route to companyEvent.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'companyEventCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/companyEvents/:id', function() {

    it('should route to companyEvent.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'companyEventCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/companyEvents/:id', function() {

    it('should route to companyEvent.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'companyEventCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/companyEvents/:id', function() {

    it('should route to companyEvent.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'companyEventCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
