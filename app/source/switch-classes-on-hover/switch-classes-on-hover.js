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
            link: function(){

            }
        };
    });
}());