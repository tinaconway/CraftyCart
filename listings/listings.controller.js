var keyVal;

(function () {

  angular
    .module('find')
    .controller('ListingController', function ($scope, $routeParams, FindService, $rootScope, $location, $q, $cacheFactory, CartService) {
      var vm = this;
      FindService.getListings().then(function(listings) {
        vm.listings = listings;
      });
      if($routeParams.listingId) {
        FindService.getSingleListing($routeParams.listingId).then(function(listing) {

        vm.listing = listing;
        });
      };
      $scope.addToCart = function (listing) {
       CartService.addToCart(listing);
     };
      $scope.newKeyword = function(keyword) {
        console.log('i am in new keyword');
        keyVal = keyword.val;
        FindService.newKeyword(keyword).then(function(listings) {
        vm.listings = listings;
      }).then(function () {
            $rootScope.$broadcast('listings:updated');
          })
      };
      var watchCallback = function () {
       FindService.displayNewListings(keyVal).then(function (listings) {
         vm.listings = listings
         $scope.keyword = null;
       });
      };
      $scope.$on('listings:updated', watchCallback);
    })
})();
