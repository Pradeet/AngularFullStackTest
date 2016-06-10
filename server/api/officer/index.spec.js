'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var officerCtrlStub = {
  index: 'officerCtrl.index',
  show: 'officerCtrl.show',
  create: 'officerCtrl.create',
  update: 'officerCtrl.update',
  destroy: 'officerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var officerIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './officer.controller': officerCtrlStub
});

describe('Officer API Router:', function() {

  it('should return an express router instance', function() {
    expect(officerIndex).to.equal(routerStub);
  });

  describe('GET /api/officer', function() {

    it('should route to officer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'officerCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/officer/:id', function() {

    it('should route to officer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'officerCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/officer', function() {

    it('should route to officer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'officerCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/officer/:id', function() {

    it('should route to officer.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'officerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/officer/:id', function() {

    it('should route to officer.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'officerCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/officer/:id', function() {

    it('should route to officer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'officerCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
