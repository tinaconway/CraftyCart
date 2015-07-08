var keyVal;

(function () {

  angular
    .module('find')
    .controller('MainController', function ($scope, $routeParams, FindService, $rootScope, $location) {
      FindService.getListings().then(function(listings) {
        $scope.listings = listings;
      });
      FindService.getSingleListing($routeParams.listingId).then(function(listing) {

      $scope.listing = listing;
      });

      $scope.newKeyword = function(keyword) {
        keyVal = keyword.val;
        FindService.newKeyword(keyword).then(function(listings) {
        $scope.listings = listings;
      }).then(function () {
            $rootScope.$broadcast('listings:updated');
          })



      };
      var watchCallback = function () {
        console.log(keyVal);
       FindService.displayNewListings(keyVal).then(function (listings) {
         $scope.listings = listings

       });
      };
      $scope.$on('listings:updated', watchCallback);
    })
    .controller('CartController', function ($scope, $rootScope, CartService) {
      $scope.addToCart = function(listing) {
        CartService.addToCart(listing);
      }
      CartService.getCartItems().then(function(items) {

        $scope.items = items;
      })
      $scope.deleteItem = function(id) {
        CartService.deleteItem(id);
      }
      var watchCallback = function () {
       CartService.getCartItems().then(function (items) {
         console.log(items);
         $scope.items = items;
       });
      };

     $scope.$on('item:deleted', watchCallback);



    });


})();
