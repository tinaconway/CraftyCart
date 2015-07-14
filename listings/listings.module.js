(function () {
  'use strict';
  angular
    .module('find', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/listings', {
          templateUrl: 'listings/views/list.html',
          controller: 'ListingController',
          controllerAs: 'listingCtrl'
        })
        .when('/listing/:listingId', {
          templateUrl: 'listings/views/detail.html',
          controller: 'ListingController',
          controllerAs: 'listingCtrl'
        });
    });
})();
