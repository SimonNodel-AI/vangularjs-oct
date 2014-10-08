(function () {
    'use strict';

    var aiSpinnerModule = angular.module('sn.spinner', []);

    aiSpinnerModule.directive('snSpinner', function () {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                showSpinner: '=snSpinner'
            },
            template: '<div class="expander">' +
                '<div ng-show="showSpinner" class="sn-spinner-container"></div>' +
                '<div ng-hide="showSpinner" ng-transclude></div>' +
                '</div>',
            link: function () {
            }
        };
    });
}());
