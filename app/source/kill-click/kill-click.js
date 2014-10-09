(function(){
    'use strict';

    var theModule = angular.module('sn.killClickEvent', []);

    theModule.directive('killClickEvent', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {

                var clickHandler = function (event) {
                    event.stopPropagation();
                };

                element.on('click', clickHandler);

                scope.$on('$destroy', function () {
                    element.off('click', clickHandler);
                });
            }
        };
    });
}());