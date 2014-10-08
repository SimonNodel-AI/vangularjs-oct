'use strict';

xdescribe('switchClassesOnHover', function () {
    var testContext;

    beforeEach(module('sn.switchClassesOnHover'));

    beforeEach(inject(function($compile, $rootScope) {
        testContext = this;

        testContext.elementScope = $rootScope.$new();
        testContext.compile = $compile;
        testContext.rootScope = $rootScope;
    }));

    var buildElement = function(html, scope){
        var testElement = testContext.compile(html)(scope);
        angular.element(document.body).append(testElement);
        testContext.rootScope.$digest();
        return testElement;
    };

    it('should add given classes to test element on mouse enter and remove it on mouse leave', function () {
        var html = '<div id="testElement" class="abc foo" switch-classes-on-hover classes-to-add="bar bim"></div>';
        var testElement = buildElement(html, testContext.elementScope);

        expect(testElement.hasClass('abc')).toBe(true);
        expect(testElement.hasClass('foo')).toBe(true);
        expect(testElement.hasClass('bar')).toBe(false);
        expect(testElement.hasClass('bim')).toBe(false);
        testElement.triggerHandler('mouseenter');
        expect(testElement.hasClass('bar')).toBe(true);
        expect(testElement.hasClass('bim')).toBe(true);
        testElement.triggerHandler('mouseleave');
        expect(testElement.hasClass('bar')).toBe(false);
        expect(testElement.hasClass('bim')).toBe(false);
    });

    it('should remove given classes from test element on mouse enter and add it on mouse leave', function () {
        var html = '<div id="testElement" class="abc foo" switch-classes-on-hover classes-to-remove="foo"></div>';
        var testElement = buildElement(html, testContext.elementScope);

        expect(testElement.hasClass('abc')).toBe(true);
        expect(testElement.hasClass('foo')).toBe(true);
        testElement.triggerHandler('mouseenter');
        expect(testElement.hasClass('foo')).toBe(false);
        testElement.triggerHandler('mouseleave');
        expect(testElement.hasClass('foo')).toBe(true);
    });

    it('should add and remove given classes from test element on mouse enter and add and remove on mouse leave', function () {
        var html =
            '<div id="testElement" class="abc" switch-classes-on-hover classes-to-add="bar" classes-to-remove="abc"></div>';
        var testElement = buildElement(html, testContext.elementScope);

        expect(testElement.hasClass('abc')).toBe(true);
        expect(testElement.hasClass('bar')).toBe(false);
        testElement.triggerHandler('mouseenter');
        expect(testElement.hasClass('bar')).toBe(true);
        expect(testElement.hasClass('abc')).toBe(false);
        testElement.triggerHandler('mouseleave');
        expect(testElement.hasClass('bar')).toBe(false);
        expect(testElement.hasClass('abc')).toBe(true);
    });

    it('should not throw when one of the classes to remove does not exist', function () {
        var html =
            '<div id="testElement" class="abc foo bar" switch-classes-on-hover classes-to-remove="foo bim"></div>';
        var testElement = buildElement(html, testContext.elementScope);

        expect(testElement.hasClass('abc')).toBe(true);
        expect(testElement.hasClass('foo')).toBe(true);
        expect(testElement.hasClass('bar')).toBe(true);
        expect(function(){
            testElement.triggerHandler('mouseenter');
            expect(testElement.hasClass('abc')).toBe(true);
            expect(testElement.hasClass('foo')).toBe(false);
            expect(testElement.hasClass('bar')).toBe(true);
            testElement.triggerHandler('mouseleave');
            expect(testElement.hasClass('abc')).toBe(true);
            expect(testElement.hasClass('foo')).toBe(true);
            expect(testElement.hasClass('bar')).toBe(true);
        }).not.toThrow();
    });

});
