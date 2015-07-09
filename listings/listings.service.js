(function () {

  angular
    .module('find')
    .factory('FindService', function ($http, _, moment, $rootScope, $q, $cacheFactory) {
      var cacheEngine = $cacheFactory('Listings');
      var url = 'https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&api_key=sbtb2imrts61fnj3u01di40g&callback=JSON_CALLBACK';
      var keywordUrl = 'https://openapi.etsy.com/v2/listings/active.js?includes=MainImage&api_key=sbtb2imrts61fnj3u01di40g&keywords='
      var imgUrl = 'https://openapi.etsy.com/v2/listings/'
      var getListings = function() {
        var deferred = $q.defer();
        var cache = cacheEngine.get('listings');
        if(cache) {
           console.log('we are in our cache');
           deferred.resolve(cache);
         } else {
           $http.jsonp(url).then(function (listings) {
             var listingArray = [];
             for (var i = 0; i < 25; i++) {
               var listingObj = {
                 id: listings.data.results[i].listing_id,
                 title: listings.data.results[i].title,
                 description: listings.data.results[i].description,
                 currency: listings.data.results[i].currency_code,
                 materials: listings.data.results[i].materials,
                 price: listings.data.results[i].price,
                 url: listings.data.results[i].url,
                 img: listings.data.results[i].MainImage
               }

               listingArray.push(listingObj);
             }
             console.log('we are in our http method');
             cacheEngine.put('listings', listingArray);
              deferred.resolve(listingArray);
           });
         }
         return deferred.promise;
       };

      var newKeyword = function(keyword) {
        var deferred = $q.defer();
        var cache = cacheEngine.get('listings');
        if(cache) {
           console.log('we are in our cache');
           deferred.resolve(cache);
         } else {
           $http.jsonp(keywordUrl + keyword.val + '&callback=JSON_CALLBACK').then(function(listings) {
          console.log(listings);
          var listingArray = [];
          for (var i = 0; i <25; i++) {
            var listingObj = {
              id: listings.data.results[i].listing_id,
              title: listings.data.results[i].title,
              description: listings.data.results[i].description,
              currency: listings.data.results[i].currency_code,
              materials: listings.data.results[i].materials,
              price: listings.data.results[i].price,
              url: listings.data.results[i].url,
              img: listings.data.results[i].MainImage
            }
            listingArray.push(listingObj);
          }

          cacheEngine.put('listings', listingArray);
           deferred.resolve(listingArray);
        });
      }
      return deferred.promise;
    };
      var displayNewListings = function() {

        var deferred = $q.defer();
        var cache = cacheEngine.get('newListings');
        if(cache) {
           console.log('we are in our cache');
           deferred.resolve(cache);
         } else {
           $http.jsonp(keywordUrl + keyVal + '&callback=JSON_CALLBACK').then(function(listings) {
          var listingArray = [];
          for (var i = 0; i <25; i++) {
            var listingObj = {
              id: listings.data.results[i].listing_id,
              title: listings.data.results[i].title,
              description: listings.data.results[i].description,
              currency: listings.data.results[i].currency_code,
              materials: listings.data.results[i].materials,
              price: listings.data.results[i].price,
              url: listings.data.results[i].url,
              img: listings.data.results[i].MainImage
            }
            listingArray.push(listingObj);
          }
          cacheEngine.put('listings', listingArray);
           deferred.resolve(listingArray);
        });
      }
      return deferred.promise;
    };
      var getSingleListing = function(id) {

        var deferred = $q.defer();
        var cache = cacheEngine.get('detailListing');
        if(cache) {
         console.log('single photo cache');
         deferred.resolve(_.where(cache, {id: id})[0]);
       } else {
         var listingId = id;
         getListings().then(function (listingArray) {
           console.log(listingArray);
           var filteredArray = [];
           listingArray.forEach(function(el) {
             console.log(el.id);
             console.log(listingId);
             el.id = el.id.toString();
             if (el.id === listingId) {

               filteredArray.push(el);

             }
           })

             deferred.resolve(filteredArray[0]);
         });
       }
       return deferred.promise;

     };
      //   var listingId = id;
      //   return getListings().then(function(listingArray) {
      //     var filteredArray = [];
      //     listingArray.forEach(function(el) {
      //       el.id = el.id.toString();
      //       if (el.id === listingId) {
      //         filteredArray.push(el);
      //       }
      //     })
      //       return filteredArray[0];
      //   })
      // };
        return {
          getListings: getListings,
          getSingleListing: getSingleListing,
          newKeyword: newKeyword,
          displayNewListings: displayNewListings
        };
    })

})();
