'use strict';

angular.module('angularFullStackTestApp', ['angularFullStackTestApp.auth',
    'angularFullStackTestApp.admin', 'angularFullStackTestApp.constants', 'ngCookies',
    'ngResource', 'ngSanitize', 'ngRoute', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
