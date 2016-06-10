'use strict';

angular.module('angularFullStackTestApp.auth', ['angularFullStackTestApp.constants',
    'angularFullStackTestApp.util', 'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
