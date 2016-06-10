'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var committeeCtrlStub = {
  index: 'committeeCtrl.index',
  show: 'committeeCtrl.show',
  create: 'committeeCtrl.create',
  update: 'committeeCtrl.update',
  destroy: 'committeeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var committeeIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './committee.controller': committeeCtrlStub
});

describe('Committee API Router:', function() {

  it('should return an express router instance', function() {
    expect(committeeIndex).to.equal(routerStub);
  });

  describe('GET /api/committee', function() {

    it('should route to committee.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'committeeCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/committee/:id', function() {

    it('should route to committee.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'committeeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/committee', function() {

    it('should route to committee.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'committeeCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/committee/:id', function() {

    it('should route to committee.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'committeeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/committee/:id', function() {

    it('should route to committee.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'committeeCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/committee/:id', function() {

    it('should route to committee.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'committeeCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
