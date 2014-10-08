(function(app){
    'use strict';

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'source/main-view.html',
                controller: 'MainController as mainController'
            })
            .otherwise({
                redirectTo: '/'
            });
    });


    app.controller('MainController', function($scope){
        var controller = this;

        controller.testChecked = true;
        controller.checkboxDisabledState = true;

        controller.clickCounter = 0;

        controller.showSpinner = true;
    });
}(
    angular.module('sn.vangularJsOct', [
        'ng',
        'ngRoute',
        'ui.bootstrap',
        'sn.faCheckbox',
        'sn.killClickEvent',
        'sn.switchClassesOnHover',
        'sn.spinner'
    ])
));
