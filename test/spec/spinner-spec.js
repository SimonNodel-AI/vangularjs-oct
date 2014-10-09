'use strict';

describe('snSpinner', function() {
    var element, scope;
    beforeEach(module('sn.spinner'));

    beforeEach(inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.showSpinner = false;

        var html = '<div sn-spinner="showSpinner"><span>some text</span></div>';
        element = $compile(html)(scope);
        angular.element(document.body).append(element);
        scope.$digest();
    }));

    it('should replace the element with a specialized structure', function () {
        expect(element.hasClass('expander')).toBe(true);
        expect(element.children().length).toEqual(2);
        expect(element.children(0).hasClass('sn-spinner-container')).toBe(true);
        expect(element.children(1).find('div[ng-transclude]')).toBeDefined();
        expect(element.children(1).children(0).text().trim()).toBe('some text');
    });

    it('should show spinner when a bound boolean property is true and hide transcluded contents', function () {
        scope.showSpinner = true;
        scope.$digest();

        expect(element.children()[0].className.split(' ')).not.toContain('ng-hide');
        expect(element.children(1)[1].className.split(' ')).toContain('ng-hide');
    });

    it('should hide spinner when a bound boolean property is false and show transcluded contents', function () {
        scope.showSpinner = false;
        scope.$digest();

        expect(element.children()[0].className.split(' ')).toContain('ng-hide');
        expect(element.children()[1].className.split(' ')).not.toContain('ng-hide');
    });
});