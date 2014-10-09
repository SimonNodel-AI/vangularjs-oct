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
            link: function (scope, element, attrs) {
                var spinnerLines = attrs.lines || 13;
                var spinnerLength = attrs.length ||  3;
                var spinnerWidth = attrs.width ||  2;
                var spinnerRadius = attrs.radius ||  5;
                var spinnerCorners = attrs.corners ||  1;
                var spinnerSpeed = attrs.speed ||  1;
                var spinnerClassName = attrs.className ||  'sn-spinner-container';

                var opts = {
                    lines: spinnerLines, // The number of lines to draw
                    length: spinnerLength, // The length of each line
                    width: spinnerWidth, // The line thickness
                    radius: spinnerRadius, // The radius of the inner circle
                    corners: spinnerCorners, // Corner roundness (0..1)
                    speed: spinnerSpeed, // Rounds per second
                    className: spinnerClassName // The CSS class to assign to the spinner
                };

                var spinner = new Spinner(opts).spin();
                var loadingContainer = element.find('.sn-spinner-container')[0];
                loadingContainer.appendChild(spinner.el);
            }
        };
    });
}());
