(function () {
  'use strict';
  angular
    .module('main')
    .controller('MainController', function ($scope, $location) {
      // $scope.hello = "hello world";
    });


})();




//
//
// (function () {
//   angular
//     .module('find')
//     .controller('MainController', function ($scope, $routeParams, FindService, $rootScope, $location, $q, $cacheFactory) {
//       FindService.getListings().then(function(listings) {
//         console.log(listings);
//         $scope.listings = listings;
//       });
//       if($routeParams.listingId) {
//         FindService.getSingleListing($routeParams.listingId).then(function(listing) {
//         $scope.listing = listing;
//         });
//       }
//       $scope.newKeyword = function(keyword) {
//         keyVal = keyword.val;
//         FindService.newKeyword(keyword).then(function(listings) {
//         $scope.listings = listings;
//       }).then(function () {
//             $rootScope.$broadcast('listings:updated');
//           })
//       };
//       var watchCallback = function () {
//
//         console.log(keyVal);
//        FindService.displayNewListings(keyVal).then(function (listings) {
//          $scope.listings = listings
//          $scope.keyword = null;
//        });
//       };
//       $scope.$on('listings:updated', watchCallback);
//     })
//     .controller('CartController', function ($scope, $rootScope, CartService, $location) {
//       $scope.addToCart = function(listing) {
//         CartService.addToCart(listing);
//       };
//       CartService.getCartItems().then(function(items) {
//         $scope.items = items;
//       });
//       $scope.deleteItem = function(id) {
//         CartService.deleteItem(id);
//       };
//       var watchCallback = function () {
//        CartService.getCartItems().then(function (items) {
//          console.log(items);
//          $scope.items = items;
//        });
//       };
//
//      $scope.$on('item:deleted', watchCallback);
//
//
//
//     });
//
//
// })();
