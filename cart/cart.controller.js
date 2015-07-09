(function () {
  'use strict';
  angular
    .module('cart')
    .controller('CartController', function ($scope, $rootScope, CartService, $location) {
      $scope.addToCart = function(listing) {
        CartService.addToCart(listing);
      };
      CartService.getCartItems().then(function(items) {
        $scope.items = items;
      });
      $scope.deleteItem = function(id) {
        CartService.deleteItem(id);
      };
      var watchCallback = function () {
       CartService.getCartItems().then(function (items) {
         console.log(items);
         $scope.items = items;
       });
      };

      $scope.$on('item:deleted', watchCallback);



      });

})();
