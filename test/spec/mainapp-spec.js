'use strict';

describe('MainApp', function () {
    var testContext;

    beforeEach(module('sn.vangularJsOct'));

    beforeEach(inject(function($route){
        testContext = this;
        testContext.route = $route;
    }));

    it('should configure default route', function () {
        expect(testContext.route.routes['/'].templateUrl).toBe('source/main-view.html')
    });
});
