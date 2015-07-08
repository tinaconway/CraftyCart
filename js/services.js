

(function () {

  angular
    .module('find')
    .factory('FindService', function ($http, _, moment, $rootScope) {
      var url = 'https://openapi.etsy.com/v2/listings/active.js?api_key=sbtb2imrts61fnj3u01di40g&callback=JSON_CALLBACK';
      var keywordUrl = 'https://openapi.etsy.com/v2/listings/active.js?api_key=sbtb2imrts61fnj3u01di40g&keywords='
      var imgUrl = 'https://openapi.etsy.com/v2/listings/'
      var getListings = function() {
        return $http.jsonp(url).then(function(listings) {
          console.log(listings);
          var listingArray = [];
          for (var i = 0; i <10; i++) {
            listings.data.results[i]
            var listingObj = {
              id: listings.data.results[i].listing_id,
              title: listings.data.results[i].title,
              description: listings.data.results[i].description,
              currency: listings.data.results[i].currency_code,
              materials: listings.data.results[i].materials,
              price: listings.data.results[i].price,
              url: listings.data.results[i].url
            }
            listingArray.push(listingObj);
          }
          return listingArray;
        }).then(function(listingArray) {
          listingArray.forEach(function(el) {
            var el = el;
            $http.jsonp(imgUrl + el.id + '/images.js?api_key=sbtb2imrts61fnj3u01di40g&callback=JSON_CALLBACK').then(function(listing) {

              el.imgUrl = listing.data.results[0];

            })
          })

        return listingArray

        })
      };
    //   var getNewListings = function(keyVal) {
    //     var newListings = function(listings) {
    //       var listingArray = [];
    //       for (var i = 0; i < 10; i++) {
    //         var listingObj = {
    //           id: listings.data.results[i].listing_id,
    //           title: listings.data.results[i].title,
    //           description: listings.data.results[i].description,
    //           currency: listings.data.results[i].currency_code,
    //           materials: listings.data.results[i].materials,
    //           price: listings.data.results[i].price,
    //           url: listings.data.results[i].url
    //         };
    //         listingArray.push(listingObj);
    //       };
    //       return listingArray;
    //     }.then(function(listingArray) {
    //       listingArray.forEach(function(el) {
    //         var el = el;
    //         $http.jsonp(imgUrl + el.id + '/images.js?api_key=bf6widx5qyoz5x1su1peiqbx&callback=JSON_CALLBACK').then(function(listing) {
    //
    //           el.imgUrl = listing.data.results[0];
    //       })
    //
    //     })
    //     return listingArray;
    //     })
    // };
      var newKeyword = function(keyword) {
        return $http.jsonp(keywordUrl + keyword.val + '&callback=JSON_CALLBACK').then(function(listings) {
          console.log(listings);
          var listingArray = [];
          for (var i = 0; i <10; i++) {
            var listingObj = {
              id: listings.data.results[i].listing_id,
              title: listings.data.results[i].title,
              description: listings.data.results[i].description,
              currency: listings.data.results[i].currency_code,
              materials: listings.data.results[i].materials,
              price: listings.data.results[i].price,
              url: listings.data.results[i].url
            }
            listingArray.push(listingObj);
          }
          return listingArray;
        }).then(function(listingArray) {
          listingArray.forEach(function(el) {
            var el = el;
            $http.jsonp(imgUrl + el.id + '/images.js?api_key=sbtb2imrts61fnj3u01di40g&callback=JSON_CALLBACK').then(function(listing) {

              el.imgUrl = listing.data.results[0];

            })
          })

        return listingArray

      })

      };
      var displayNewListings = function() {
        console.log(keyVal);
        return $http.jsonp(keywordUrl + keyVal + '&callback=JSON_CALLBACK').then(function(listings) {
          console.log(listings);
          var listingArray = [];
          for (var i = 0; i <10; i++) {
            var listingObj = {
              id: listings.data.results[i].listing_id,
              title: listings.data.results[i].title,
              description: listings.data.results[i].description,
              currency: listings.data.results[i].currency_code,
              materials: listings.data.results[i].materials,
              price: listings.data.results[i].price,
              url: listings.data.results[i].url
            }
            listingArray.push(listingObj);
          }
          return listingArray;
        }).then(function(listingArray) {
          listingArray.forEach(function(el) {
            var el = el;
            $http.jsonp(imgUrl + el.id + '/images.js?api_key=sbtb2imrts61fnj3u01di40g&callback=JSON_CALLBACK').then(function(listing) {

              el.imgUrl = listing.data.results[0];

            })
          })

        return listingArray

      })
      }


      var getSingleListing = function(id) {
        var listingId = id;
        return getListings().then(function(listingArray) {
          var filteredArray = [];
          listingArray.forEach(function(el) {
            el.id = el.id.toString();
            if (el.id === listingId) {
              filteredArray.push(el);
            }
          })

            return filteredArray[0];
        })

      };

        return {
          getListings: getListings,
          getSingleListing: getSingleListing,
          newKeyword: newKeyword,
          displayNewListings: displayNewListings
        };
    })
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
