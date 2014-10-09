'use strict';

describe('killClickEvent', function () {
    var testContext;

    beforeEach(module('sn.killClickEvent'));

    beforeEach(inject(function($rootScope, $compile) {
        testContext = this;
        testContext.scope = $rootScope.$new();
        testContext.rootScope = $rootScope;
        testContext.compile = $compile;
        testContext.scope.value = 1;
        testContext.scope.changeVarToFive = function() { testContext.scope.value = 5;};
        testContext.scope.changeVarToTen = function() { testContext.scope.value = 10;};
    }));

    var buildElement = function(html, scope){
        var testElement = testContext.compile(html)(scope);
        angular.element(document.body).append(testElement);
        testContext.rootScope.$digest();
        return testElement;
    };

    it('should set value to 5 when there is no kill-click-event directive', function () {
        var html = '<div ng-click="changeVarToFive()"><div id="target" ' +
            'ng-click="changeVarToTen()"></div></div>';
        var element = buildElement(html, testContext.scope);

        expect(testContext.scope.value).toBe(1);

        element.children('#target').click();
        expect(testContext.scope.value).toBe(5);
    });

    it('should set value to 10 when with  kill-click-event directive', function () {
        var html ='<div ng-click="changeVarToFive()"><div id="target" ' +
            'ng-click="changeVarToTen()" kill-click-event></div></div>';
        var element = buildElement(html, testContext.scope);

        expect(testContext.scope.value).toBe(1);

        element.children('#target').click();
        expect(testContext.scope.value).toBe(10);
    });

    it('should detach event listener on destroy', function () {
        var html = '<div ng-click="changeVarToFive()"><div id="target" ' +
            'ng-click="changeVarToTen()" kill-click-event></div></div>';
        var element = buildElement(html, testContext.scope);

        spyOn($.fn, 'off');
        testContext.scope.$broadcast('$destroy');
        testContext.scope.$digest();
        expect($.fn.off).toHaveBeenCalledWith('click', jasmine.any(Function));
    });
});