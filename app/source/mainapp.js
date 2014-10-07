(function(app){
    'use strict';

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'source/main-view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
}(
    angular.module('sn.vangularJsOct', [
        'ng',
        'ngRoute',
        'ui.bootstrap'
    ])
));
