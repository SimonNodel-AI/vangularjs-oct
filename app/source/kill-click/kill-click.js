(function(){
    'use strict';

    var theModule = angular.module('sn.killClickEvent', []);

    theModule.directive('killClickEvent', function () {
        return {
            restrict: 'A',
            link: function () {

            }
        };
    });
}());
