(function(){
    'use strict';

    var theModule = angular.module('sn.switchClassesOnHover', []);

    theModule.directive('switchClassesOnHover', function(){
        return {
            restrict: 'A',
            scope: {
                classesToAdd: '@',
                classesToRemove: '@'
            },
            link: function(scope, element){
                element.on('mouseenter', function() {
                    element.addClass(scope.classesToAdd);
                    element.removeClass(scope.classesToRemove);
                });
                element.on('mouseleave', function() {
                    element.addClass(scope.classesToRemove);
                    element.removeClass(scope.classesToAdd);
                });
            }
        };
    });
}());
