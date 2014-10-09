(function () {
    'use strict';

    var theModule = angular.module('sn.faCheckbox', []);

    theModule.directive('faCheckbox', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<i class="fa fa-lg" ng-click="toggleChecked()" ng-class="appliedClasses"></i>',
            scope: {
                checkboxClass: '@',
                disabled: '=',
                checked: '='
            },
            link: function (scope) {
                var determineClassesToApply = function () {
                    var classes = [];
                    classes.push((scope.checked ? 'fa-check-square-o' : 'fa-square-o'));
                    classes.push((scope.disabled ? 'disabled-cursor xlight-grey-color' : 'sn-clickable-icon'));
                    classes.push(scope.checkboxClass);
                    scope.appliedClasses = classes.join(' ');
                };

                scope.$watch('checked', determineClassesToApply);

                scope.$watch('disabled', function () {
                    determineClassesToApply();
                });

                scope.toggleChecked = function () {
                    if (!scope.disabled) {
                        scope.checked = !scope.checked;
                    }
                };
            }
        };
    });
}());
