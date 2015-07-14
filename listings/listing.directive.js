(function () {
  'use strict';
  angular
    .module('find')
    .directive('singleListDirective', function () {
      return {
        restrict: 'E', // E - element, A - attribute, C - class
        templateUrl: 'listings/views/listing.directive.html',
        scope: {
          listing: '=',
          extra: '@',
          action: '&',
          action2: '&'
        },
        link: function (scope, element, attributes) {


        }
      };
    });
})();
