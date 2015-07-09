
(function () {
  'use strict';
  angular
    .module('cart')
    .factory('CartService', function ($http, _, moment, $rootScope) {
      var url= 'http://tiy-fee-rest.herokuapp.com/collections/find'
      var addToCart = function(listing) {
        $http.post(url, listing).success(function(resp) {
          console.log(resp);
        }).error(function(err) {
          console.log(err);
        });
      };
      var getCartItems = function() {
        return $http.get(url).then(function(items) {
          return items.data;
        });
      };
      var deleteItem = function(id) {
        $http.delete(url + '/' + id).success(function(resp) {
          $rootScope.$broadcast('item:deleted');
        })
      };
      return {
        addToCart: addToCart,
        getCartItems: getCartItems,
        deleteItem: deleteItem
      };
    });

})();
