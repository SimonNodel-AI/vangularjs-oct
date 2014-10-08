(function(){
    'use strict';

    var theModule = angular.module('sn.faCheckbox', []);

    theModule.directive('faCheckbox', function(){
        return {
            restrict: 'E',
            template: '<div>this should be replaced with a checkbox</div>'
        };
    });
}());
