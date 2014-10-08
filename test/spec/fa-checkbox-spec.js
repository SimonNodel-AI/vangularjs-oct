'use strict';

xdescribe('faCheckbox', function () {
    var testContext;

    beforeEach(module('sn.faCheckbox'));

    beforeEach(inject(function ($rootScope, $compile) {
        testContext = this;

        testContext.elementScope = $rootScope.$new();
        testContext.elementScope.checkedState = false;
        testContext.elementScope.disabledState = false;
        testContext.elementScope.onChangeSpy = jasmine.createSpy('onChangeSpy');

        var html = '<fa-checkbox checked="checkedState" on-change="onChangeSpy()" disabled="disabledState"/>';

        testContext.testElement = $compile(html)(testContext.elementScope);
        angular.element(document.body).append(testContext.testElement);
        $rootScope.$digest();

        testContext.isolateScope = testContext.testElement.isolateScope();
    }));

    it('should configure appliedClasses correctly when NOT checked and NOT disabled', function () {
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o sn-clickable-icon');
    });

    it('should configure appliedClasses correctly when checked and NOT disabled', function () {
        testContext.elementScope.checkedState = true;
        testContext.elementScope.$digest();
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-check-square-o sn-clickable-icon');
    });

    it('should configure appliedClasses correctly when checked and disabled', function () {
        testContext.elementScope.checkedState = true;
        testContext.elementScope.disabledState = true;
        testContext.elementScope.$digest();
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-check-square-o disabled-cursor xlight-grey-color');
    });

    it('should configure appliedClasses correctly when NOT checked and disabled', function () {
        testContext.elementScope.disabledState = true;
        testContext.elementScope.$digest();
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o disabled-cursor xlight-grey-color');
    });

    it('should change checked state and applied classes on click when NOT disabled', function () {
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o sn-clickable-icon');
        expect(testContext.elementScope.checkedState).toBe(false);
        testContext.testElement.triggerHandler('click');
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-check-square-o sn-clickable-icon');
        expect(testContext.elementScope.checkedState).toBe(true);
        testContext.testElement.triggerHandler('click');
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o sn-clickable-icon');
        expect(testContext.elementScope.checkedState).toBe(false);
    });

    it('should NOT change checked state and applied classes on click when NOT checked and disabled', function () {
        testContext.elementScope.disabledState = true;
        testContext.elementScope.$digest();
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o disabled-cursor xlight-grey-color');
        expect(testContext.elementScope.checkedState).toBe(false);
        testContext.testElement.triggerHandler('click');
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-square-o disabled-cursor xlight-grey-color');
        expect(testContext.elementScope.checkedState).toBe(false);
    });

    it('should NOT change checked state and applied classes on click when checked and disabled', function () {
        testContext.elementScope.checkedState = true;
        testContext.elementScope.disabledState = true;
        testContext.elementScope.$digest();
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-check-square-o disabled-cursor xlight-grey-color');
        expect(testContext.elementScope.checkedState).toBe(true);
        testContext.testElement.triggerHandler('click');
        expect(testContext.isolateScope.appliedClasses).toEqual('fa-check-square-o disabled-cursor xlight-grey-color');
        expect(testContext.elementScope.checkedState).toBe(true);
    });

    it('should fire onChange function after the value changes', function () {
        expect(testContext.elementScope.onChangeSpy.calls.count()).toBe(0);
        testContext.testElement.triggerHandler('click');
        expect(testContext.elementScope.onChangeSpy.calls.count()).toBe(1);
        testContext.testElement.triggerHandler('click');
        expect(testContext.elementScope.onChangeSpy.calls.count()).toBe(2);
    });

    it('should NOT fire onChange function when disabled changes', function () {
        testContext.elementScope.disabledState = true;
        testContext.elementScope.$digest();
        expect(testContext.elementScope.onChangeSpy.calls.count()).toBe(0);
        testContext.testElement.triggerHandler('click');
        expect(testContext.elementScope.onChangeSpy.calls.count()).toBe(0);
    });
});
