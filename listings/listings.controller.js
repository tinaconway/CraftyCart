var keyVal;

(function () {

  angular
    .module('find')
    .controller('ListingController', function ($scope, $routeParams, FindService, $rootScope, $location, $q, $cacheFactory) {
      FindService.getListings().then(function(listings) {
        $scope.listings = listings;
      });
      if($routeParams.listingId) {
        FindService.getSingleListing($routeParams.listingId).then(function(listing) {
        $scope.listing = listing;
        });
      }
      $scope.newKeyword = function(keyword) {
        keyVal = keyword.val;
        FindService.newKeyword(keyword).then(function(listings) {
        $scope.listings = listings;
      }).then(function () {
            $rootScope.$broadcast('listings:updated');
          })
      };
      var watchCallback = function () {
       FindService.displayNewListings(keyVal).then(function (listings) {
         $scope.listings = listings
         $scope.keyword = null;
       });
      };
      $scope.$on('listings:updated', watchCallback);
    })
})();
