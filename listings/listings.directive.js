(function () {
  'use strict';
  angular
    .module('find')
    .directive('listDirective', function () {
      return {
        restrict: 'E', // E - element, A - attribute, C - class
        templateUrl: 'listings/views/listings.directive.html',
        scope: {
          listing: '=',
          extra: '@',
          action: '&'
        },
        link: function (scope, element, attributes) {
          // element.find('header').find('a').on('mouseover', function () {
          //   scope.url = 'http://www.placecage.com/c/400/600';
          //   scope.$apply();
          // });

          // element.on('click', function (e) {
          //   e.preventDefault();
          //   console.log(attributes.calvin);
          //   element.find('img').toggleClass('grow');
          // });

        }
      };
    });
})();
